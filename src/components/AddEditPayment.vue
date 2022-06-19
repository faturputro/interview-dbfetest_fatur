<template>
  <el-dialog
    v-model="inputVal"
    :title="dialogTitle"
    width="30%"
    :before-close="handleClose"
  >
    <span>
      <el-form
        ref="paymentForm"
        label-position="top"
        :model="details"
        :rules="rules"
        status-icon
      >
        <el-form-item label="Type Key" prop="type_key">
          <el-select v-model="details.type_key" class="w-full" placeholder="Type Key" size="large">
            <el-option
              v-for="item in typeKeyDropdownItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Beneficiary Name" prop="beneficiary_account_id">
          <el-select
            v-model="details.beneficiary_account_id"
            filterable
            remote
            reserve-keyword
            placeholder="Please enter account name"
            class="w-full"
            :remote-method="(query) => getAccounts(query, 'beneficiary')"
            :loading="loading"
          >
            <el-option
              v-for="item in beneficiaryOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Remitter Name" prop="remitter_account_id">
          <el-select
            v-model="details.remitter_account_id"
            filterable
            remote
            reserve-keyword
            placeholder="Please enter account name"
            class="w-full"
            :remote-method="(query) => getAccounts(query, 'remitter')"
            :loading="loading"
          >
            <el-option
              v-for="item in remitterOpts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Amount" prop="amount">
          <el-input v-model="details.amount" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            v-model="details.description"
            :rows="4"
            type="textarea"
          />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="submitForm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import AccountService from '../services/account'

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
    details: {
      type: Object,
      default: () => ({}),
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    typeKeysOptions: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      beneficiaryOpts: [],
      remitterOpts: [],
      loading: false,
      rules: {
        beneficiary_account_id: [
          { required: true, message: 'Beneficiary is required.', trigger: 'blur' },
        ],
        remitter_account_id: [
          { required: true, message: 'Remitter is required.', trigger: 'blur' },
        ],
        type_key: [
          { required: true, message: 'Type Key is required.', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: 'Amount is required.', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    dialogTitle() {
      const type = this.isNew ? 'Add' : 'Edit'
      return `${type} Payment`
    },
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    typeKeyDropdownItems() {
      return this.typeKeysOptions.filter((item) => item.value !== '')
    },
  },
  methods: {
    handleClose() {
      this.inputVal = false
      this.$emit('close')
    },
    async submitForm() {
      await this.$refs.paymentForm.validate((valid) => {
        this.$emit('submit')
      })
    },
    async getAccounts(query, type) {
      if (query !== '') {
        this.loading = true
        const payload = {
          data: {
            name: query,
          },
        }
        const res = await AccountService.getAccount(payload)
        if (type === 'beneficiary') {
          this.beneficiaryOpts = res.data
        } else {
          this.remitterOpts = res.data
        }
        this.loading = false
      }
    },
  },
}
</script>
