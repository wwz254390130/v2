<template>
  <detail :is-edit='true' :detailId="this.$route.params.id"></detail>
</template>

<script>
import Detail from './components/Detail'

export default {
  name: 'permissionsEdit',
  components: { Detail }
}
</script>

