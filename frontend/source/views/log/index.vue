<template>
    <div>
        <div class="white-box">
            <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
                <el-form-item label="request">
                    <el-input v-model="form.request"></el-input>
                </el-form-item>
                <el-form-item label="Method">
                    <el-select v-model="form.method">
                        <el-option label="GET" value="GET"></el-option>
                        <el-option label="POST" value="POST"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="ip">
                    <el-input v-model="form.ip"></el-input>
                </el-form-item>
                <el-form-item label="reffer">
                    <el-input v-model="form.reffer"></el-input>
                </el-form-item>
                <el-form-item label="browser">
                    <el-input v-model="form.browser"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handle_search(true)">Search</el-button>
                    <el-button  @click="handle_reset">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
            :data="list"
            stripe
            style="width: 100%">
            <el-table-column align="center" prop="code" label="Code" width="80"> </el-table-column>
            <el-table-column align="left" prop="request" label="Request">
                <template slot-scope="scope">
                    <template v-if="scope.row.method == 'GET'">
                        <el-tag size="small" type="success">{{ scope.row.method }}</el-tag>
                    </template>
                    <template v-if="scope.row.method == 'POST'">
                        <el-tag size="small">{{ scope.row.method }}</el-tag>
                    </template>
                    <template v-if="scope.row.method != 'POST' && scope.row.method != 'GET'">
                        <el-tag size="small" type="warning">{{ scope.row.method }}</el-tag>
                    </template>
                    {{ scope.row.request }}
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" prop="reffer" label="reffer"> </el-table-column> -->
            <el-table-column align="center" prop="ip" label="IP" width="150"> </el-table-column>
            <!-- <el-table-column align="center" prop="browser" label="browser"> </el-table-column> -->
            <el-table-column align="center" prop="timestamp" label="Time" width="220"> </el-table-column>
        </el-table>

        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pagination.page"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            @current-change="handle_page_change">
        </el-pagination>
        
    </div>
</template>

<script>
export default {
    data () {
        return {
            list: [],
            form: {
                request: '',
                method: '',
                code: '',
                ip: '',
                browser: '',
                reffer: '',
            },
            pagination: {
                page: 1,
                pageSize: 100,
                total: 0
            }
        }
    },

    methods: {
        /**
         * 查询
         * @param {Boolean} reset 是否重置页码
         */
        async handle_search (reset = false) {
            if (reset == true) {
                this.pagination.page = 1;
            }

            const request = Object.assign(this.form, {
                page: this.pagination.page,
                pageSize: this.pagination.pageSize
            });
            this.$api.get_logs_list(request).then(res => {
                this.list = res.data.list;
                this.pagination.total = res.data.total;
            });
        },

        handle_reset () {
            Object.keys(this.form).map(key => {
                this.form[key] = '';
            });
            this.handle_search(true);
        },

        handle_page_change (page) {
            this.pagination.page = page;
            this.handle_search();
        }
    },

    mounted () {
        this.handle_search();
    }
}
</script>