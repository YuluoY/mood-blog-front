<!-- eslint-disable import/extensions -->
<template>
  <div class="m-mPagination">
    <el-config-provider :locale="zhCn">
      <el-pagination
        :style="{
          marginTop: '20px',
        }"
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="pageSizes"
        :small="small"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import zhCn from '../../locale/zh-cn.ts'
import { MPaginationProps } from '../types/index.ts'

const props = withDefaults(defineProps<Partial<MPaginationProps>>(), {
  page: 1,
  limit: 10,
  small: false,
  background: true,
  pageSizes: () => [10, 20, 30, 40, 50],
})

const page = ref(props.page)
const limit = ref(props.limit)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
<style scoped lang="scss"></style>
