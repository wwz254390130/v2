<template>
  <detail :is-edit='true' :detailId="this.$route.params.id"></detail>
</template>

<script>
import Detail from './components/Detail'

export default {
  name: 'rolesEdit',
  components: { Detail }
}
</script>

