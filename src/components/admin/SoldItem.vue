<template>
  <li class="sold-item">
    {{ item.title }}
  </li>
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
