<template>
    <div>
        <div class="model_topcol">
            <span>出库单</span>
            <div>
                <!--<el-button size="small">导入出库单</el-button>-->
                <!--<el-button size="small">导出出库单</el-button>-->
                <el-button type="primary" @click="purchaseAddEvent" size="small" v-perss="'新增出库单'">新增出库单</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <el-card v-show="isSupperBoxShow" class="box_card">
                    <div slot="header" class="clearfix">
                        <span :style="{fontSize: '16px'}">高级搜索</span>
                        <i @click="supperBoxShow" class="el-icon-close" style="float: right; padding: 3px 0; cursor: pointer"></i>
                    </div>
                    <el-form class="myForm" :inline="true" :model="searchFormData" label-position="right" size="small" label-width="80px">
                        <el-form-item label="出库仓库">
                            <el-select
                                v-model="searchFormData.houseId"
                                filterable
                                placeholder="请选择仓库">
                                <el-option
                                    v-for="item in houseId_option"
                                    :key="item.id"
                                    :label="item.warehouseName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出库类型">
                            <el-select v-model="searchFormData.deliverType" placeholder="请选择">
                                <el-option label="商城订单" value="0"></el-option>
                                <el-option label="线下订单" value="1"></el-option>
                                <el-option label="采购退货" value="2"></el-option>
                                <el-option label="批发" value="3"></el-option>
                                <el-option label="其他" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="经办人">
                            <el-input v-model="searchFormData.operator" placeholder="请输入经办人"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="采购单位">
                            <el-select v-model="searchFormData.buyerId" placeholder="请选择">
                                <el-option
                                    v-for="item in buyerId_option"
                                    :key="item.id"
                                    :label="item.buyerCompanyName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="制单人">
                            <el-input v-model="searchFormData.creator" placeholder="请输入制单人"></el-input>
                        </el-form-item>
                        <el-form-item label="审核状态">
                            <el-select v-model="searchFormData.auditStatus" placeholder="请选择" >
                                <el-option label="待审核" value="0"></el-option>
                                <el-option label="审核中" value="1"></el-option>
                                <el-option label="通过" value="2"></el-option>
                                <el-option label="不通过" value="3"></el-option>
                                <el-option label="撤销" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item label="出库时间">
                            <el-date-picker
                                v-model="searchFormData.date"
                                type="daterange"
                                :editable="false"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <br>
                        <el-form-item>
                            <el-button style="width: 90px" type="primary" @click="supperSureBoxShow">确定</el-button>
                            <el-button @click="supperBoxShow" style="width: 90px">取消</el-button>
                            <el-button type="text" style="width: 40px; color: #636365" @click="clear">清空</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
                <div v-show="!isExportShow&&!isFreSupBoxShow" class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入出库单号"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        @keyup.enter.native='search'
                        clearable
                        @change="clearSearchStr"
                        v-model="searchFormData.searchStr">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small" @click="search">搜索</el-button>
                    <span @click="supperBoxShow">高级搜索</span>
                </div>
                <div v-show="!isExportShow&&isFreSupBoxShow" class="purchaseList_title">
                    <span class="resspan">搜索结果</span>
                    <el-button @click="resetSeraBtnEvent" icon="fa fa-eraser" type="text">清除搜索</el-button>
                    <el-button @click="goSeraBtnEvent" icon="el-icon-search" type="text">继续搜索</el-button>
                </div>
                <div v-show="isExportShow" class="purchaseList_exportWrap">
                    <ul>
                        <li :style="{borderRight: '1px solid #E4E7ED', fontSize: '12px', color: '#757577'}">
                            <span :style="{fontSize: '18px',verticalAlign: 'middle'}" class="el-icon-close" @click="closeExportWrap"></span>
                            <span>已选择</span>
                            <span v-text="selectTableData.length"> 2 </span>
                            <span>项</span>
                        </li>
                        <li :style="{paddingLeft: '20px'}">
                            <!--<el-button :style="{width: '100px'}" size="small">导出</el-button>-->
                        </li>
                    </ul>
                </div>

                <el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 83"
                    ref="purchaseListTable"
                    @selection-change="handleSelectionChange"
                    :row-key="getRowKeys"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="deliverNo"
                        label="出库单号"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="deliverTime"
                        label="出库时间"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.deliverTime | time_m}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="buyerName"
                        label="采购单位">
                    </el-table-column>
                    <el-table-column
                        prop="deliverHouseName"
                        label="出库仓库">
                    </el-table-column>
                    <el-table-column
                        prop="deliverType"
                        label="出库类型">
                        <template slot-scope="scope">
                            <span>{{$allEnumeration.deliverType[scope.row.deliverType]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="creator"
                        label="制单人">
                    </el-table-column>
                    <el-table-column
                        prop="operator"
                        label="经办人">
                    </el-table-column>
                    <el-table-column
                        label="审核状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditStatus == 0" class="auditStatus_0">{{$allEnumeration.auditStatus[0]}}</span>
                            <span v-if="scope.row.auditStatus == 1" class="auditStatus_1">{{$allEnumeration.auditStatus[1]}}</span>
                            <span v-if="scope.row.auditStatus == 2" class="auditStatus_2">{{$allEnumeration.auditStatus[2]}}</span>
                            <span v-if="scope.row.auditStatus == 3" class="auditStatus_3">{{$allEnumeration.auditStatus[3]}}</span>
                            <span v-if="scope.row.auditStatus == 4" class="auditStatus_4">{{$allEnumeration.auditStatus[4]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="prop"
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                                v-perss="'出库单详情'"
                                :style="{marginRight: '12px'}"
                                @click.native.prevent="inBoundDetail(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                详情
                            </el-button>
                            <div v-if="scope.row.auditStatus == 0" style="display: inline-block">
                                <!--待审核-->
                                <!--<el-button-->
                                    <!--:style="{marginLeft: '12px'}"-->
                                    <!--@click.native.prevent="editTable(scope.$index, scope.row)"-->
                                    <!--type="text"-->
                                    <!--size="small">-->
                                    <!--修改-->
                                <!--</el-button>-->
                                <el-button
                                    v-perss="'删除出库单'"
                                    @click.native.prevent="deleteTable(scope.$index, scope.row)"
                                    type="text"
                                    size="small">
                                    删除
                                </el-button>
                            </div>
                            <div v-if="scope.row.auditStatus == 1" style="display: inline-block">
                                <!--审核中-->
                                <el-button
                                    :style="{marginLeft: '12px'}"
                                    @click.native.prevent="undo(scope.$index, scope.row)"
                                    type="text"
                                    size="small">
                                    撤回
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import 'utils/allEnumeration'
import ME from 'utils/base'
import API from 'api/depot'
export default {
    data(){
        return {
            userInfo: {},
            serchText: '',
            currentPage: 1,
            selectTableData: [],
            isSupperBoxShow: false,
            isFreSupBoxShow: false,
            tableHeight: 500,
            searchFormData: {
                deliverNo: null,
                houseId: null,
                deliverType: null,
                creator: null,
                operator: null,
                buyerId: null,
                startTime: null,
                endTime: null,
                date: null,
                searchStr: null,
                auditStatus: null
            },
            loading: false,
            houseId_option: [],
            buyerId_option: [],
            isExportShow: false,
            tableData: [
                {
                    auditStatus: '',
                    buyerId: '',
                    buyerName: '',
                    creator: '',
                    deliverHouseId: '',
                    deliverHouseName: '',
                    deliverNo: '',
                    deliverTime: '',
                    deliverType: '',
                    id: '',
                    operator: ''
                }
            ],
            total: 0,
            update: false
        }
    },
    computed:{},
    methods:{
        getRowKeys(row){
            return row.id
        },
        resetSeraBtnEvent(){
            this.clear()
            this.search()
            this.isFreSupBoxShow = false
        },
        goSeraBtnEvent(){
            this.isSupperBoxShow = true
        },
        supperSureBoxShow(){
            this.isFreSupBoxShow = true
            this.search()
        },
        handleSizeChange(data){
            this.currentPage = 1
            this.searchFormData.pageNo = this.currentPage
            this.searchFormData.pageSize = data
            this.getOutboundList(this.searchFormData)
        },
        handleCurrentChange(data){
            this.searchFormData.pageNo = data
            this.getOutboundList(this.searchFormData)
        },
        // 获取出库列表
        getOutboundList(data) {
            API.getOutboundList(data).then(res => {
                this.tableData = res.data.list
                this.total = res.data.total || 0
            })
        },
        // 获取采购列表
        getPurchaseList() {
            API.getPurchaseAll().then(res => {
                this.buyerId_option = res.data
                console.log(this.buyerId_option, "采购列表")
            })
        },
        // 入库仓库模糊搜索
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    API.getWarehouseListActive().then(res => {
                        this.houseId_option = res.data.filter(item => {
                            return item.warehouseName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                        console.log(res, "请求来仓库")
                    })
                }, 200);
            } else {
                this.houseId_option = [];
            }
        },
        // 仓库列表获取
        getWareHouseList() {
            API.getWarehouseListActive().then(res => {
                this.houseId_option = res.data
            })
        },
        // 搜索
        search() {
            if (this.searchFormData.date) {
                this.searchFormData.startTime = Date.parse(this.searchFormData.date[0]) / 1000
                this.searchFormData.endTime = Date.parse(this.searchFormData.date[1]) / 1000
            }
            this.postData = ME.deepCopy(this.searchFormData)
            this.$delete(this.postData, 'date')
            console.log(this.postData)
            this.getOutboundList(this.postData)
            this.isSupperBoxShow = false
        },
        // 搜索清空
        clear() {
            for (let key in this.searchFormData) {
                if (key != 'searchStr') {
                    this.searchFormData[key] = null
                }
            }
        },
        clearSearchStr() {
            this.search()
        },
        inBoundDetail(index, data){
            this.$router.push({name: '出入库详情', params: {id: data.id, type: 'outbound'}})
        },
        // 修改
        editTable(index, data) {
            this.$router.push({
                name: '编辑出入库',
                params: {type: 'outbound', id: data.id}
            })
        },
        // 撤回
        undo(index, data) {
            this.$confirm('此操作将撤回该审核订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let obj = {
                    processType: 4,
                    orderId: data.id,
                    submitterId: this.userInfo.user.id // 本地账户的信息id
                }

                API.undoAudit(3, obj).then(res => {
                    if (res.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '撤回成功!'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消撤回'
                });
            })
        },
        // 删除
        deleteTable(index, data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.delOutboundOrder(data.id).then(res => {
                    if (res.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.tableData.splice(index, 1)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },
        closeExportWrap(){
            this.isExportShow = false
            this.$refs.purchaseListTable.clearSelection()
        },
        handleSelectionChange(val){
            this.selectTableData = val
            if (this.selectTableData.length > 0){
                this.isExportShow = true
            } else {
                this.isExportShow = false
            }
        },
        supperBoxShow(){
            this.isSupperBoxShow = !this.isSupperBoxShow
        },
        purchaseAddEvent(){
            this.$router.push({
                name: '新增入库',
                params: {type: '出库'}
            })
        },
        dropdownSelectEvent(command){
            if (command == 1){
                this.$router.push({
                    path: '/purchaseListDetail'
                })
            }
        }
    },
    created(){},
    mounted(){
        this.getPurchaseList()
        this.getWareHouseList()
        this.currentPage = 1
        this.getOutboundList()
    },
    activated() {
        this.clear()
        if (this.update) {
            this.currentPage = 1
            this.getOutboundList()
        }
        this.userInfo = localStorage.getItem('userInfo')
        this.isSupperBoxShow = false

    },
    beforeRouteLeave(to, from, next) {
        if (to.name == '新增入库') {
            this.update = true
        } else {
            this.update = false
        }
        next()
    }
}
</script>


<style scoped>
    .purchaseList_title{
        height: 63px;
        line-height: 63px;
        padding-left: 17px;
    }
    .purchaseList_exportWrap{
        height: 63px;
        padding-top: 15px;
    }
    .purchaseList_title span{
        cursor: pointer;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        font-size: 12px;
    }
    .purchaseList_exportWrap>ul{
        overflow: hidden;
        padding-left: 0;
    }
    .purchaseList_exportWrap>ul>li{
        float: left;
        padding: 0 20px;
        height: 33px;
        line-height: 32px;
    }
    .box_card{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 300px;
        z-index: 9;
    }
    .model_content_inner{
        position: relative;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 390px;
    }
    .el-form, .el-table{
        color: #636365;
    }
    .el-table .cell .auditStatus_0, .el-table .cell .auditStatus_1{
        color: #e6a23c;
    }
    .el-table .cell .auditStatus_2{
        color: #606266;
    }
    .el-table .cell .auditStatus_3{
        color: #f56c6c;
    }

</style>
