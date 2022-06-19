<template>
  <el-dialog
    v-model="inputVal"
    :title="dialogTitle"
    width="30%"
    :before-close="handleClose"
  >
    <span>
      <el-form
        ref="accountForm"
        label-position="top"
        :model="details"
        :rules="rules"
        status-icon
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="details.name" />
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
// import { computed, ref, reactive } from 'vue'
// const accountForm = ref()

export default {
  props: {
    value: {
      type: Boolean,
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
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: 'Name is required.', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    dialogTitle() {
      const type = this.isNew ? 'Add' : 'Edit'
      return `${type} Account`
    },
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    handleClose() {
      this.inputVal = false
      this.$emit('close')
    },
    async submitForm() {
      await this.$refs.accountForm.validate((valid) => {
        this.$emit('submit')
      })
    },
  },
}
</script>
