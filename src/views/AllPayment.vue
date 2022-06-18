<template>
  <div>
    <page-header title="Payments" description="Create or view payment"></page-header>
    <div class="flex flex-col lg:flex-row xl:flex-row items-center justify-between">
      <div class="w-1/2">
        <el-input
          v-model="searchVal"
          placeholder="Search payment"
          class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="typeKey" placeholder="Type" style="width: 115px;">
              <el-option label="All" value="" />
              <el-option label="Incoming" value="incoming" />
              <el-option label="Outgoing" value="outgoing" />
              <el-option label="Internal" value="internal" />
            </el-select>
          </template>
          <template #append>
            <el-button>Search</el-button>
          </template>
        </el-input>
      </div>
      <div class="w-1/5">
        <el-button type="primary" class="w-full mr-2">Add Account</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="mt-4">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="amount" label="Amount" width="180" />
      <el-table-column prop="beneficiary_account_id" label="Beneficiary ID" width="250" />
      <el-table-column prop="beneficiary_name" label="Beneficiary Name" width="250" />
      <el-table-column prop="beneficiary_account_number" label="Beneficiary Account No." width="250"/>
      <el-table-column prop="remitter_account_id" label="Remitter ID" width="250" />
      <el-table-column prop="remitter_name" label="Remitter Name" width="250" />
      <el-table-column prop="remitter_account_number" label="Remitter Account No." width="250" />
    </el-table>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import PaymentService from '../services/payment'

export default {
  components: {
    Search,
  },
  data() {
    return {
      searchVal: '',
      typeKey: '',
      tableData: [],
    }
  },
  created() {
    this.fetchPayments()
  },
  methods: {
    async fetchPayments() {
      try {
        const payload = {
          data: {}
        };
        const res = await PaymentService.getPayments(payload)
        this.tableData = res.data.map((item) => ({...item, actions: null}))
      } catch (e) {
        // 
      }
    },
    async searchPayment() {
      this.$router.push({ name: 'Payments', query: { q: this.searchVal, t: this.typeKey } })
      await this.fetchAccounts()
    },
    async closeAccount(id) {
      try {
        await AccountService.closeAccount(id)
        await this.fetchPayments()
        ElMessage({
          message: 'Account successfully closed.',
          type: 'success',
        });
      } catch (e) {
        // 
      }
    },
  },
};
</script>