<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-delete"></i> 退课选择
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
                <el-table-column prop="apply_name" label="申请人" align="center"></el-table-column>
                <el-table-column prop="s_name" label="店铺名" align="center">
                </el-table-column>
                <el-table-column prop="apply_time" label="申请时间" align="center"></el-table-column>
                <el-table-column prop="s_type" label="店铺类型" align="center">
                </el-table-column>

                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-success"
                            class="green"
                            @click="handleDelete(scope.$index, scope.row)"
                        >同意申请</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-error"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >驳回申请</el-button>
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
            tableData: [{apply_name:'jack',s_name:'north',apply_time:'2020-07-15 12:04:56',s_type:'家电'},
                        {apply_name:'rose',s_name:'south',apply_time:'2020-07-15 12:04:56',s_type:'通信'}],
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
        // 获取 easy-mock 的模拟数据
        getData() {
            postRequest('/student', {
                'method': 'getCourseInfo'
            }).then(resp => {
                var date = resp.data;
                if (date.code === 200) {
                    this.tableData = date.message;
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
                    postRequest('/stuCourseSelect', {
                        'method': 'removeSelect',
                        'cla_id': this.tableData[index].c_id
                    }).then(resp => {
                        var data = resp.data
                        if (data.code == 200) {
                            this.getData()
                            this.$message.success(data.message)
                        } else {
                            this.getData()
                            this.$message.error(data.message)
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
