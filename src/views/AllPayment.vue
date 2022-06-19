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
              <el-option
                v-for="opt in typeKeyOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </template>
          <template #append>
            <el-button @click="searchPayment">Search</el-button>
          </template>
        </el-input>
      </div>
      <div class="w-1/5">
        <el-button type="primary" class="w-full mr-2" @click="newPayment">Add Payment</el-button>
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
    <add-edit-payment
      v-model="dialogVisible"
      :is-new="isNew"
      :details="paymentDetails"
      :type-keys-options="typeKeyOptions"
      @submit="submitDetails"
      @close="dialogVisible = false"
    ></add-edit-payment>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import PaymentService from '../services/payment'
import AddEditPayment from '../components/AddEditPayment.vue';

export default {
  components: {
    Search,
    AddEditPayment,
  },
  data() {
    return {
      searchVal: '',
      typeKey: '',
      tableData: [],
      paymentDetails: {
        beneficiary_account_id: '',
        remitter_account_id: '',
        amount: null,
        description: '',
        type_key: '',
      },
      dialogVisible: false,
      isNew: true,
      typeKeyOptions: [
        {
          label: 'All',
          value: '',
        },
        {
          label: 'Incoming',
          value: 'incoming',
        },
        {
          label: 'Outgoing',
          value: 'outgoing',
        },
        {
          label: 'Internal',
          value: 'internal',
        },
      ],
    }
  },
  created() {
    this.fetchPayments()
  },
  methods: {
    async fetchPayments() {
      try {
        let payload = {
          data: {}
        }
        if (this.searchVal !== '') {
          Object.assign(payload.data, { data: { id: this.searchVal } })
        }
        const res = await PaymentService.getPayments(payload)
        this.tableData = res.data.map((item) => ({...item, actions: null}))
      } catch (e) {
        // 
      }
    },
    async searchPayment() {
      this.$router.push({ name: 'Payments', query: { q: this.searchVal, t: this.typeKey } })
      await this.fetchPayments()
    },
    newPayment() {
      this.dialogVisible = true
      this.isNew = true
      this.paymentDetails.type_key = 'internal'
    },
    async submitDetails() {
      try {
        const payload = {
          data: {
            ...this.paymentDetails,
            amount: parseInt(this.paymentDetails.amount, 10)
          },
        }
        await PaymentService.createPayment(payload)
        ElMessage({
          message: `Payment successfully ${this.isNew ? 'created' : 'updated'}.`,
          type: 'success',
        });
        this.dialogVisible = false
        this.fetchPayments()
        this.paymentDetails = {
          beneficiary_account_id: '',
          remitter_account_id: '',
          amount: null,
          description: '',
          type_key: 'internal',
        }
      } catch (e) {
        // do nothing
      }
    },
  },
};
</script>