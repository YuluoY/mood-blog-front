<template>
  <div class="y-userManager">
    <AdminTemplate
      @onChangeAddVisible="() => (addVisible = !addVisible)"
      @onChangeDelVisible="() => (delVisible = !delVisible)"
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
      <template #table>
        <MTable></MTable>
      </template>
    </AdminTemplate>
  </div>
</template>
<script setup lang="ts">
const addVisible = ref(false)
const delVisible = ref(false)
const updateVisible = ref(false)
</script>
<style scoped lang="scss"></style>
