<template>
  <div class="top">
    <AdminNav /> 
    <div class="bottom">
      <div class="sales-area">
        <SoldList />
      </div>
    </div>
  </div>
</template>

<script>
import SoldList from '~/components/admin/SoldList'
import AdminNav from '~/components/admin/AdminNav'

export default {
  components: {
    SoldList,
    AdminNav
  }
}
</script>

