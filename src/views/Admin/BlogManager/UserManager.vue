<template>
  <div class="y-userManager">
    <AdminTemplate
      @onChangeAddVisible="() => (addVisible = !addVisible)"
      @onChangeDelVisible="() => (delVisible = !delVisible)"
      @onChangeModifyVisible="() => (modifyVisible = !modifyVisible)"
    >
      <template #add>
        <el-dialog v-model="addVisible" title="Tips" width="30%">
          <span>This is a message</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addVisible = false">Cancel</el-button>
              <el-button type="primary" @click="addVisible = false">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
      </template>
      <template #del>
        <el-dialog v-model="delVisible" title="Tips" width="30%">
          <span>This is a message</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="delVisible = false">Cancel</el-button>
              <el-button type="primary" @click="delVisible = false">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
      </template>
      <template #modify>
        <el-dialog v-model="modifyVisible" title="Tips" width="30%">
          <span>This is a message</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="modifyVisible = false">Cancel</el-button>
              <el-button type="primary" @click="modifyVisible = false">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
      </template>
      <template #table>
        <MTable :tableData="tableData" :columnLabel="columnLabel">
          <template #pagination>
            <MPagination :total="total" :page="page" :limit="limit"></MPagination>
          </template>
        </MTable>
      </template>
    </AdminTemplate>
  </div>
</template>
<script setup lang="ts">
import { getUsersByPage } from '@/api/user.ts'
import { IUser } from '@/types/api/user.ts';

const addVisible = ref(false)
const delVisible = ref(false)
const modifyVisible = ref(false)

const page = ref(1)
const limit = ref(10)
const total = ref(0)
const tableData = reactive<object[]>([])
const columnLabel = reactive<{ label: string; prop: string }[]>([])

const res = await getUsersByPage<IUser>(page.value, limit.value)

if (res.success) {
  total.value = res.data.total
  tableData.push(...res.data.list as object[])
  console.log(tableData);
  
  if (tableData.length) {
    const filterColumnLabel = Object.keys(tableData[0]).map((key) => {
      return { label: key, prop: key }
    })
    console.log(filterColumnLabel);
    
    columnLabel.push(...filterColumnLabel)
  }
}
</script>
<style scoped lang="scss"></style>
