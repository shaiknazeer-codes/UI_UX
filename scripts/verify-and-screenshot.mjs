import { spawn } from 'child_process'
import puppeteer from 'puppeteer-core'
import fs from 'fs'
import path from 'path'

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

const screenshotsDir = path.resolve('screenshots')
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true })
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now()
  let lastError = null
  while (Date.now() - start < timeoutMs) {
    for (const testUrl of [url, url.replace('localhost', '127.0.0.1')]) {
      try {
        const res = await fetch(testUrl)
        if (res.ok) {
          console.log(`Connected to ${testUrl}`)
          return testUrl
        }
      } catch (e) {
        lastError = e
      }
    }
    await new Promise((r) => setTimeout(r, 400))
  }
  throw new Error(`Server did not start: ${lastError?.message || 'unknown error'}`)
}

const TEST_PORT = 3456
const TEST_HOST = '127.0.0.1'
const BASE_URL = `http://${TEST_HOST}:${TEST_PORT}`

async function run() {
  console.log(`Starting Next.js production server on port ${TEST_PORT}...`)
  const nextServer = spawn('npx', ['next', 'start', '-p', String(TEST_PORT), '-H', TEST_HOST], {
    shell: true,
    stdio: 'pipe'
  })

  nextServer.stdout.on('data', (d) => process.stdout.write(`[Server] ${d}`))
  nextServer.stderr.on('data', (d) => process.stderr.write(`[Server ERR] ${d}`))

  try {
    console.log(`Waiting for ${BASE_URL} to be ready...`)
    const readyUrl = await waitForServer(BASE_URL)
    console.log(`Server is ready at ${readyUrl}! Launching headless browser...`)

    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    const consoleErrors = []
    const pageErrors = []

    page.on('response', (res) => {
      if (res.status() === 404) {
        console.log(`  404 Resource: ${res.url()}`)
      }
    })
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    page.on('pageerror', (err) => {
      pageErrors.push(err.message)
    })

    // Test widths
    const widths = [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'laptop', width: 1024, height: 800 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 812 }
    ]

    for (const vp of widths) {
      console.log(`Verifying viewport: ${vp.name} (${vp.width}x${vp.height})...`)
      await page.setViewport({ width: vp.width, height: vp.height })
      await page.goto(readyUrl, { waitUntil: 'networkidle0' })

      // Check horizontal overflow and find offending elements
      const overflowInfo = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth
        const winWidth = window.innerWidth
        const hasOverflow = docWidth > winWidth
        const offenders = []

        if (hasOverflow) {
          const all = document.querySelectorAll('*')
          for (const el of all) {
            const rect = el.getBoundingClientRect()
            if (rect.right > winWidth + 1) {
              offenders.push({
                tag: el.tagName,
                id: el.id,
                className: el.className ? String(el.className).slice(0, 80) : '',
                right: rect.right,
                width: rect.width
              })
            }
          }
        }
        return { hasOverflow, docWidth, winWidth, offenders: offenders.slice(0, 5) }
      })

      console.log(`  Viewport ${vp.name}: overflow = ${overflowInfo.hasOverflow} (doc: ${overflowInfo.docWidth}, win: ${overflowInfo.winWidth})`)
      if (overflowInfo.offenders.length > 0) {
        console.log('  Offenders:', overflowInfo.offenders)
      }

      if (vp.name === 'desktop') {
        // Capture desktop screenshot (Dark theme)
        await page.screenshot({
          path: path.join(screenshotsDir, 'desktop.png'),
          fullPage: false
        })
        console.log('  Saved screenshots/desktop.png')

        // Capture light theme
        await page.evaluate(() => {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('kestrel-theme', 'light')
        })
        await new Promise((r) => setTimeout(r, 300))
        await page.screenshot({
          path: path.join(screenshotsDir, 'desktop-light.png'),
          fullPage: false
        })
        console.log('  Saved screenshots/desktop-light.png')

        // Restore dark theme
        await page.evaluate(() => {
          document.documentElement.classList.add('dark')
          localStorage.setItem('kestrel-theme', 'dark')
        })
      }

      if (vp.name === 'mobile') {
        // Capture mobile screenshot
        await page.screenshot({
          path: path.join(screenshotsDir, 'mobile.png'),
          fullPage: false
        })
        console.log('  Saved screenshots/mobile.png')
      }
    }

    // Verify all anchor target elements exist
    console.log('Verifying anchor link targets...')
    const anchors = ['#hero', '#hero-demo', '#features', '#workflows', '#keyboard', '#integrations', '#changelog', '#testimonials', '#pricing', '#footer']
    const anchorResults = await page.evaluate((ids) => {
      return ids.map((id) => ({
        id,
        exists: !!document.querySelector(id)
      }))
    }, anchors)

    for (const res of anchorResults) {
      console.log(`  Anchor target ${res.id}: ${res.exists ? 'FOUND' : 'MISSING'}`)
    }

    console.log(`Console errors recorded: ${consoleErrors.length}`)
    if (consoleErrors.length > 0) {
      console.log('Errors:', consoleErrors)
    }

    console.log(`Page runtime errors: ${pageErrors.length}`)
    if (pageErrors.length > 0) {
      console.log('Page Errors:', pageErrors)
    }

    await browser.close()
    console.log('All browser verifications completed successfully!')
  } finally {
    console.log('Shutting down server...')
    if (nextServer.pid) {
      spawn('taskkill', ['/pid', String(nextServer.pid), '/f', '/t'], { shell: true })
    }
  }
}

run().catch((err) => {
  console.error('Verification failed:', err)
  process.exit(1)
})
