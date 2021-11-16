<template>
  <div class="content">
    {{ item }}
    {{ item.title }} / {{ item.thumbnail }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
