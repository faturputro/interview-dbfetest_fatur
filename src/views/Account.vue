<template>
  <div>
    <page-header title="Accounts" description="Create or view account"></page-header>
    <div class="flex flex-col lg:flex-row xl:flex-row items-center justify-between">
      <div class="w-1/2">
        <el-input
          v-model="searchVal"
          placeholder="Search account"
          class="input-with-select"
        >
          <template #append>
            <el-button @click="searchAccount">Search</el-button>
          </template>
        </el-input>
      </div>
      <div class="w-48">
        <el-button type="primary" class="w-full mr-2" @click="newAccount">Add Account</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="mt-4">
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="number" label="Number" />
      <el-table-column prop="balance" label="Balance" />
      <el-table-column label="Action" width="180">
        <template #default="scope">
          <div class="flex">
            <el-button type="info" size="small" @click="fetchAccountDetails(scope.row)">Edit</el-button>
            <el-popconfirm :title="`Close account number ${scope.row.number}?`" @confirm="closeAccount(scope.row.id)">
              <template #reference>
                <el-button type="danger" size="small" :disabled="scope.row.balance !== 0">Close</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <add-edit-account
      v-model="dialogVisible"
      :is-new="isNew"
      :details="accountDetails"
      @submit="submitDetails"
      @close="dialogVisible = false"
    ></add-edit-account>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import AccountService from '../services/account'
import AddEditAccount from '../components/AddEditAccount.vue'

export default {
  components: {
    Search,
    AddEditAccount,
  },
  data() {
    return {
      searchVal: '',
      tableData: [],
      accountDetails: {
        name: '',
      },
      dialogVisible: false,
      isNew: true,
    }
  },
  created() {
    if (this.$route.query.q) {
      this.searchVal = this.$route.query.q
    }
    this.fetchAccounts()
  },
  methods: {
    async fetchAccounts() {
      try {
        const payload = {
          data: {
            name: this.searchVal
          }
        };
        const res = await AccountService.getAccount(payload)
        this.tableData = res.data.map((item) => ({...item, actions: null}))
      } catch (e) {
        // 
      }
    },
    async searchAccount() {
      this.$router.push({ name: 'Account', query: { q: this.searchVal } })
      await this.fetchAccounts()
    },
    async closeAccount(id) {
      try {
        await AccountService.closeAccount(id)
        await this.fetchAccounts()
        ElMessage({
          message: 'Account successfully closed.',
          type: 'success',
        });
      } catch (e) {
        // do nothing
      }
    },
    newAccount() {
      this.dialogVisible = true
      this.isNew = true
    },
    async submitDetails() {
      try {
        const payload = {
          data: {
            id: !this.isNew ? this.accountDetails.id : null,
            name: this.accountDetails.name
          },
        }
        if (this.isNew) {
          await AccountService.createAccount(payload)
        } else {
          await AccountService.updateAccount(payload.data.id, payload)
        }
        ElMessage({
          message: `Account successfully ${this.isNew ? 'created' : 'updated'}.`,
          type: 'success',
        });
        this.dialogVisible = false
        this.fetchAccounts()
      } catch (e) {
        // do nothing
      }
    },
    fetchAccountDetails(row) {
      this.dialogVisible = true
      this.isNew = false
      this.accountDetails = { ...row }
    },
  },
};
</script>