const config = {
  extends: ['@commitlint/config-conventional'],
  rules: { 'body-max-line-length': [0, 'always', Infinity] },
}

export default config
