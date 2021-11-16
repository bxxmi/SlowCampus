<template>
  <footer>
    <span>김예림</span>
    <span>박영찬</span>
    <Logo />
    <span>이태지</span>
    <span>김보미</span>
    <div class="copy-right">
      &copy;{{ new Date().getFullYear() }}Fast Campus KDT Team-slow
    </div>
  </footer>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  }
}
</script>
