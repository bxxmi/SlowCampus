<template>
  <li>
    <RouterLink :to="`${href}/${id}`">
      {{ item.title }}
    </RouterLink>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      href: '/productDetail',
      id: this.item.id
    }
  },
}
</script>
