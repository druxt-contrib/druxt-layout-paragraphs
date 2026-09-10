const { execFileSync } = require('node:child_process')
const { join } = require('node:path')

// The rule is an ES module and the package is CommonJS, so it runs in a real
// node process here, which is also how the lint:private script runs it.
const MODULE = join(__dirname, '..', 'scripts', 'lint-private-refs.mjs')

const hostsIn = (text) =>
  JSON.parse(
    execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `import { findPrivateRefs } from ${JSON.stringify(MODULE)}
         process.stdout.write(JSON.stringify(findPrivateRefs(process.argv[1]).map((r) => r.host)))`,
        text,
      ],
      { encoding: 'utf8' }
    )
  )

// The hosts below are private on purpose. The rule exempts this file by path,
// which is why it can state them plainly.
describe('findPrivateRefs', () => {
  test('finds a private host by name', () => {
    expect(hostsIn('see http://gitlab.example.local/x')).toEqual([
      'gitlab.example.local',
    ])
  })

  test('finds RFC1918 addresses', () => {
    expect(hostsIn('http://10.0.0.8/ http://192.168.1.1/')).toEqual([
      '10.0.0.8',
      '192.168.1.1',
    ])
    expect(hostsIn('http://172.16.0.1/')).toEqual(['172.16.0.1'])
  })

  test('finds an RFC1918 address inside an IPv4-mapped IPv6 literal', () => {
    // Every spelling of the same address: compressed or expanded, with the
    // last 32 bits dotted or hexadecimal.
    expect(hostsIn('https://[::ffff:10.0.0.8]/x')).toEqual(['10.0.0.8'])
    expect(hostsIn('https://[::ffff:0a00:0008]/x')).toEqual(['10.0.0.8'])
    expect(hostsIn('https://[0:0:0:0:0:ffff:10.0.0.8]/x')).toEqual(['10.0.0.8'])
    expect(hostsIn('https://[0:0:0:0:0:ffff:0a00:0008]/x')).toEqual([
      '10.0.0.8',
    ])
    expect(hostsIn('http://[::ffff:c0a8:0101]/')).toEqual(['192.168.1.1'])
  })

  test('finds a link-local IPv6 address', () => {
    expect(hostsIn('http://[fe80::1]/')).toEqual(['fe80::1'])
  })

  test('leaves public hosts alone', () => {
    expect(hostsIn('https://druxtjs.org/docs')).toEqual([])
    expect(hostsIn('http://[2001:db8::1]/')).toEqual([])
    expect(hostsIn('http://[::ffff:8.8.8.8]/')).toEqual([])
    expect(hostsIn('http://[::ffff:0808:0808]/')).toEqual([])
  })

  test('leaves the local development hosts alone', () => {
    expect(hostsIn('http://localhost:3000/ http://127.0.0.1:8888/')).toEqual([])
    expect(hostsIn('http://[::1]/ https://example.ddev.site/')).toEqual([])
  })

  test('reads the host, not the userinfo a git remote carries', () => {
    expect(hostsIn('https://oauth2:token@gitlab.example.local/a')).toEqual([
      'gitlab.example.local',
    ])
  })
})
