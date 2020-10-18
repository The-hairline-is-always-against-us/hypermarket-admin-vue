<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-search"></i> 店铺管理
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
                <el-table-column prop="s_name" label="店铺名称" align="center"></el-table-column>
                <el-table-column prop="username" label="店主名称" align="center">
                </el-table-column>
                <el-table-column prop="request_time" label="申请时间" align="center"></el-table-column>
                <el-table-column prop="create_time" label="批准时间" align="center"></el-table-column>
                <el-table-column prop="s_status" label="店铺状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.s_status == 0">正常</span>
                        <span v-if="scope.row.s_status != 0">封禁</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            :disabled="scope.row.maxFlag"
                            @click="handleEdit(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="确认选课？" :visible.sync="editVisible" width="30%" center>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit" :loading="loading">确 定</el-button>
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
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            loading: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            this.getRequest('/getAllStore').then(resp => {
                var date = resp.data;
                if (date.code === 200) {
                    this.tableData = date.message;
                } else {
                    this.$message.error(date.message);
                }
            })
        },
        // 编辑操作
        handleEdit(index, row) {
            this.postRequest('/deleteStoreBySid',{
                's_id':row.s_id
            }).then(resp => {
                var date = resp.data;
                if (data.code == 200) {
                    this.$message.success(data.message)
                    this.getData()
                } else {
                    this.$message.error(data.message)
                    this.getData()
                }
            })
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
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
