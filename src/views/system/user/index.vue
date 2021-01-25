<template>
  <el-card>
    <el-table :data="tableData">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="帐号" prop="username" show-overflow-tooltip>
        <template #default="scope">
          <el-avatar
            :size="32"
            :src="scope.row.avatar"
            icon="el-icon-user-solid"
          />
          <el-tag>{{ scope.row.username }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="240" align="center">
        <template #default="scope">
          <el-select v-model="scope.row.gender" size="small" disabled>
            <el-option
              v-for="item in genderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" width="240" align="center">
        <template #default="scope">
          <el-select
            v-model="scope.row.role"
            size="small"
            disabled
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="240" align="center">
        <template #default="scope">
          <el-select v-model="scope.row.status" size="small" disabled>
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
            type="success"
            size="mini"
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
        <el-form-item label="帐号">
          <el-input
            v-model="drawerData.username"
            :disabled="drawerData._id !== 1"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="drawerData.password"
            :placeholder="drawerData._id !== 1 ? '重置密码' : '请输入'"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="drawerData.gender">
            <el-option
              v-for="item in genderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="drawerData.role" multiple>
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="drawerData.status">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="drawerData.comment"
            type="textarea"
            placeholder="请输入"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            :on-success="handleUpload"
            :show-file-list="false"
            list-type="picture-card"
            action="http://localhost:3000/upload"
          >
            <img
              v-show="drawerData.avatar"
              :src="drawerData.avatar"
              style="width:100%;height:100%;border-radius:6px;"
            />
            <i v-show="!drawerData.avatar" class="el-icon-plus"></i>
          </el-upload>
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
import user from "@/api/user";
import role from "@/api/role";
export default {
  data() {
    return {
      drawerData: {},
      tableData: [],
      tableDataTotal: 0,
      formData: {
        limit: 10,
        skip: 0
      },
      roleList: [],
      genderList: [
        { label: "未知", value: 0 },
        { label: "男性", value: 1 },
        { label: "女性", value: 2 }
      ],
      statusList: [
        { label: "正常", value: 0 },
        { label: "禁用", value: 1 }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      this.formData.pageSize = val;
      this.handleIndex();
    },
    handleCurrentChange(val) {
      this.formData.currentPage = val;
      this.handleIndex();
    },
    handleUpload(response) {
      this.drawerData.avatar = response.files[0].url;
    },
    async handleOption() {
      const res = await role.getRoleList();
      if (res.code === 0) {
        const roleList = [];
        res.roles.forEach(item => {
          roleList.push({
            value: item.role_id,
            label: item.role_name
          });
        });
        this.roleList = roleList;
      }
    },
    async handleIndex() {
      const res = await user.getUserList(this.formData);
      if (res.code === 0) {
        this.tableData = res.users;
        this.tableDataTotal = res.count;
      }
    },
    async handleCreate(val) {
      if (val) return (this.drawerData = val);
      const res = await user.createUser(this.drawerData);
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
      const res = await user.updateUser(this.drawerData._id, this.drawerData);
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
      const res = await user.deleteUser(val._id);
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
  async created() {
    this.handleIndex();
    this.handleOption();
  }
};
</script>
