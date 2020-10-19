<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-user-solid"></i> 用户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                stripe
                class="table"
                ref="multipleTable"
            >
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="email" label="邮箱" align="center" width="400px">
                </el-table-column>
                <el-table-column prop="role.role" label="用户权限" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.role.role == 'user'">用户</span>
                        <span v-if="scope.row.role.role == 'solder'">卖家</span>
                        <span v-if="scope.row.role.role == 'admin'">管理员</span>
                        <span v-if="scope.row.role.role == 'root'">根用户</span>
                    </template>
                </el-table-column>
                <el-table-column  label="用户封禁状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.del_flag == 0">正常</span>
                        <span v-if="scope.row.del_flag != 0">封禁</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" width="270px">
                    <template slot-scope="scope">
                        <el-button type="primary" round size="mini" @click="changeRole(scope.row)">修改身份</el-button>
                        <span v-if="scope.row.del_flag == 0">
                            <el-button type="danger" round size="mini" :loading="redloading" @click="banUser(scope.row)">禁用用户</el-button>
                        </span>
                        <span v-if="scope.row.del_flag != 0">
                            <el-button type="danger" round size="mini" :loading="redloading" @click="unBanUser(scope.row)">解封用户</el-button>
                        </span>

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            center
            width="30%"
            :before-close="handleClose">
            <el-select v-model="newrole" placeholder="请选择" style="margin-left: 24%">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="realChange">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import { postRequest } from '@/utils/axiousApi';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            dialogVisible: false,
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            redloading: false,
            pageTotal: 0,
            pageSize: 10,
            pageIndex: 1,
            form: {},
            idx: -1,
            id: -1,
            row:0,
            options: [{
                value: 'user',
                label: '普通用户'
            }, {
                value: 'solder',
                label: '卖家'
            }],
            newrole: ''
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            this.getRequest(`/root/getAdminUserList/${this.pageIndex}/${this.pageSize}`).then(resp => {
                var date = resp.data;
                if (date.code === 200) {
                    this.tableData = date.message;
                    this.pageTotal = date.total;
                    console.log(this.pageTotal)
                } else {
                    this.$message.error(date.message);
                }
            })
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
            this.getData();
        },
        changeRole(row) {
            this.row = row
            this.dialogVisible = true
        },
        realChange() {
            this.dialogVisible = false
            this.postRequest('/root/changeRole',{
                'username':this.row.username,
                'role':this.newrole
            }).then(resp => {
                if (resp.data.code == 200) {
                    this.$message.success('设置成功')
                    this.getData()
                    this.redloading = false;
                }
            })
            console.log(this.newrole)
        },
        banUser(row) {
            this.redloading = true;
            this.getRequest(`/root/deleteUser/${row.username}`).then(resp => {
                if (resp.data.code == 200) {
                    this.$message.success('设置成功')
                    this.getData()
                    this.redloading = false;
                }
            })
        },
        unBanUser(row) {
            this.redloading = true;
            this.getRequest(`/root/unDeleteUser/${row.username}`).then(resp => {
                if (resp.data.code == 200) {
                    this.$message.success('设置成功')
                    this.getData()
                    this.redloading = false;
                }
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
