<template></template>

<script>
export default {
  async created() {
    await this.$store.dispatch('account/checkBankListCanChoice', {})
    await this.$store.dispatch('account/connectAccount', {})
    await this.$store.dispatch('account/ckeckAccountListandBalance', {})
    // await this.$store.dispatch('account/closeAccount', {})
  },
}
</script>
