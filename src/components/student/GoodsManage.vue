<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-text"></i> 全部课程
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
            >
                <el-table-column prop="g_name" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="t_id" label="商品类型" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.t_id == 1">手机</span>
                        <span v-if="scope.row.t_id == 2">电视机</span>
                        <span v-if="scope.row.t_id == 3">空调</span>
                        <span v-if="scope.row.t_id == 4">洗衣机</span>
                        <span v-if="scope.row.t_id == 5">保护套</span>
                        <span v-if="scope.row.t_id == 6">保护膜</span>
                        <span v-if="scope.row.t_id == 7">充电宝</span>
                        <span v-if="scope.row.t_id == 8">充电器</span>
                    </template>
                </el-table-column>
                <el-table-column prop="s_name" label="所在店铺" align="center"></el-table-column>

                <el-table-column prop="g_price" label="商品单价" align="center"> </el-table-column>
                <el-table-column prop="g_total" label="商品库存" align="center"> </el-table-column>
                <el-table-column label="操作" align="center"> 
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            :disabled="scope.row.maxFlag"
                            @click="handleDelete(scope.$index, scope.row)"
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
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            postRequest('/getGoods').then(resp => {
                var date = resp.data;
                this.tableData = date.message;
            })
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.postRequest('/deleteGoods', {
                        'g_id':row.g_id
                    }).then(resp => {
                        if (resp.data.code == 200) {
                            this.$message.success(resp.data.message)
                            this.getData()
                        } else {
                            this.$message.error(resp.data.message)
                            this.getData()
                        }
                    })
                })
                .catch(() => {});
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
