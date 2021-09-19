export default {
  methods: {
    normalizeKey(key) {
      return key.replaceAll(/\W+/g, '_').toLowerCase()
    }
  }
}
