<template>
  <el-card>
    <el-table :data="tableData">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column
        prop="permission_id"
        label="ID"
        width="240"
        align="center"
      >
        <template #default="scope">
          <el-input v-model="scope.row.permission_id" size="small" disabled />
        </template>
      </el-table-column>
      <el-table-column
        prop="permission_name"
        label="名称"
        width="240"
        align="center"
      >
        <template #default="scope">
          <el-input v-model="scope.row.permission_name" size="small" disabled />
        </template>
      </el-table-column>
      <el-table-column
        prop="comment"
        label="备注"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="created_date"
        label="日期"
        width="240"
        align="center"
      >
        <template #default="scope">
          <el-date-picker
            v-model="scope.row.created_date"
            type="datetime"
            size="small"
            disabled
          />
        </template>
      </el-table-column>
      <el-table-column width="142" align="right" fixed="right">
        <template #header>
          <el-button
            @click="handleCreate({ _id: 1 })"
            size="mini"
            type="success"
            >创建</el-button
          >
        </template>
        <template #default="scope">
          <el-button @click="handleUpdate(scope.row)" size="mini"
            >更新</el-button
          >
          <el-button @click="handleDelete(scope.row)" size="mini" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formData.skip + 1"
      :page-size="formData.limit"
      :total="tableDataTotal"
      layout="total,sizes,prev,pager,next,jumper"
      background
    />

    <el-drawer
      @close="drawerData = {}"
      :with-header="false"
      :model-value="!!drawerData._id"
    >
      <el-form label-width="40px" class="el-drawer__form">
        <el-form-item label="ID">
          <el-input
            v-model="drawerData.permission_id"
            :disabled="drawerData._id !== 1"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="drawerData.permission_name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="drawerData.comment"
            type="textarea"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="el-drawer__foot">
        <el-button
          @click="handleCreate()"
          v-show="drawerData._id === 1"
          type="primary"
          >立即创建</el-button
        >
        <el-button
          @click="handleUpdate()"
          v-show="drawerData._id !== 1"
          type="primary"
          >立即更新</el-button
        >
        <el-button @click="drawerData = {}">取消</el-button>
      </div>
    </el-drawer>
  </el-card>
</template>

<script>
import permission from "@/api/permission";
export default {
  data() {
    return {
      drawerData: {},
      tableData: [],
      tableDataTotal: 0,
      formData: {
        limit: 10,
        skip: 0
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.formData.limit = val;
      this.handleIndex();
    },
    handleCurrentChange(val) {
      this.formData.skip = val - 1;
      this.handleIndex();
    },
    async handleIndex() {
      const res = await permission.getPermissionList(this.formData);
      if (res.code === 0) {
        this.tableData = res.permissions;
        this.tableDataTotal = res.count;
      }
    },
    async handleCreate(val) {
      if (val) return (this.drawerData = val);
      const res = await permission.createPermission(this.drawerData);
      this.$message({
        message: res.message,
        type: res.code === 0 ? "success" : "error"
      });
      if (res.code === 0) {
        this.drawerData = {};
        this.handleIndex();
      }
    },
    async handleUpdate(val) {
      if (val) return (this.drawerData = JSON.parse(JSON.stringify(val)));
      const res = await permission.updatePermission(
        this.drawerData._id,
        this.drawerData
      );
      this.$message({
        message: res.message,
        type: res.code === 0 ? "success" : "error"
      });
      if (res.code === 0) {
        this.drawerData = {};
        this.handleIndex();
      }
    },
    async handleDelete(val) {
      const res = await permission.deletePermission(val._id);
      this.$message({
        message: res.message,
        type: res.code === 0 ? "success" : "error"
      });
      if (res.code === 0) {
        this.drawerData = {};
        this.handleIndex();
      }
    }
  },
  created() {
    this.handleIndex();
  }
};
</script>
