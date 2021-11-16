<template>
  <div class="check-box">
    <label for="accountCheck">
      <slot></slot>
    </label>
    <select
      id="accountCheck"
      name="myAccount">
      <option value="">
        연결된 계좌를 조회할 수 있습니다.
      </option>
      <option
        v-for="info in myAccountsNameIdNumberInfo"
        :key="info.name"
        :value="info.id">
        {{ info.name }} {{ info.accountNumber }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    myAccountsNameIdNumberInfo() {
      return this.$store.getters['account/myAccountsNameIdNumberInfo']
    },
  },
}
</script>

<style lang="scss" scoped>
.check-box {
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
  label {
    line-height: 40px;
    margin-right: 100px;
  }
  select {
    width: 400px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
  }
}
</style>
