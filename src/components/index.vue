<template>
    <div class="index-div">
      <!--搜索-->
      <div class="search-div">
        <el-date-picker
          v-model="dateArr"
          type="daterange"
          range-separator="至"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" @click="searchClick">
          <i class="el-icon-search"></i>
          <span>搜索</span>
        </el-button>
        <el-button type="warning" @click="resetClick">
          <i class="el-icon-refresh"></i>
          <span>重置</span>
        </el-button>
        <el-button type="danger" @click="addClick">
          <i class="el-icon-plus"></i>
          <span>新增</span>
        </el-button>
      </div>
      <!--列表-->
      <div class="table-div">
        <el-table
          :data="listData"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="创建人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="220">
          </el-table-column>
          <el-table-column
            prop="statusText"
            label="是否发布"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleUp(scope.$index, scope.row)">{{scope.row.status==1?"取消发布":"发布"}}</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--新增弹窗-->
      <div class="add-div">
        <el-dialog
          title="详细信息"
          :visible.sync="addVisible"
          width="60%"
          :before-close="closeAdd">
          <el-form ref="form" label-width="80px">
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="selectDate" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item :key="'银行'+i" :label="i==0?'推荐':'选择银行'" v-for="(form,i) in addForm">
              <el-select v-if="i!=0" v-model="form.tag" placeholder="请选择银行" >
                <el-option :key="'tag'+j" v-if="bank.tag!=0" :label="bank.name" :value="bank.tag" v-for="(bank,j) in banks"></el-option>
              </el-select>
              <div class="input-div" v-for="(item,index) in form.messages">
                <el-input type="textarea" v-model="form.messages[index]"></el-input>
                <i v-if="index!=0" class="delete-icon el-icon-remove-outline" @click="deleteMessage(i,index)"></i>
                <i v-if="index==0" class="delete-icon el-icon-circle-plus-outline"@click="addMessage(i)"></i>
              </div>
              <i v-if="i>1" class="delete-bank el-icon-circle-close-outline" @click="deleteBank(i)"></i>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeAdd">取 消</el-button>
            <el-button type="warning" @click="addBank">添加银行</el-button>
            <el-button type="primary" @click.prevent="okAdd">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
  import Api from '../commons/api';
  import Utils from '../commons/utils';
  export default {
      name: "index",
      data () {
          return {
            // 搜索日期
            dateArr:[],
            // 列表数据
            listData: [],
            // 是否显示详细信息弹窗
            addVisible: false,
            // 选择的日期
            selectDate: Utils.formatDate(new Date()),
            // form表单数据
            addForm: [{tag:'0', messages:['']},{tag: '', messages:['']}],
            // 银行卡列表
            banks: [],
            // 编辑的id
            editID: 0
          };
      },
      methods: {
        // 搜索
        searchClick () {
          this.getListData();
        },
        // 重置
        resetClick () {
          this.dateArr = [];
          this.getListData();
        },
        // 新增
        addClick () {
          this.addVisible = true;
        },
        addBank () {
          this.addForm.push({tag:'', messages:['']});
        },
        closeAdd () {
          this.addVisible = false;
          this.addForm = [{tag:0, messages:['']},{tag: '', messages:['']}];
          this.selectDate = Utils.formatDate(new Date());
          this.editID = 0;
        },
        okAdd () {
          let isEmpty = false;
          for (let i = 0; i < this.addForm.length;i++) {
            if(this.addForm[i].tag ===""){
              isEmpty = true;
              break;
            }
            const messages = this.addForm[i].messages;
            for (let j = 0; j < messages.length; j++) {
              if (messages[j] === "") {
                isEmpty = true;
                break;
              }
            }
            if (isEmpty) {
              break;
            }
          }

          console.log(this.addForm)
          if (isEmpty) {
            this.messageTip('请填写页面所有数据！', 'error');
            return;
          }

          if (this.editID == 0) {
            Api.insertMain({date: this.selectDate, data: this.addForm}).then((response) => {
              const res = response.data;
              if (res.errorCode == 0) {
                this.messageTip('数据新增成功', 'success');
                this.closeAdd();
                this.getListData();
              } else {
                this.messageTip('数据新增失败', 'error');
              }
            });
          } else {
            Api.editMain({id: this.editID, data: this.addForm}).then((response) => {
              const res = response.data;
              if (res.errorCode == 0) {
                this.messageTip('数据修改成功', 'success');
                this.closeAdd();
                this.getListData();
              } else {
                this.messageTip('数据修改失败', 'error');
              }
            });
          }

        },
        addMessage (i) {
          this.addForm[i].messages.push('');
        },
        deleteMessage (i,index) {
          this.addForm[i].messages.splice(index,1);
        },
        deleteBank (i) {
          this.addForm.splice(i,1);
        },
        // 发布
        handleUp (index, row) {
          this.$confirm(row.status==0?'是否发布此条数据?':'是否取消发布此条数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            Api.upMains({id: row.id, status: row.status==1? 0 : 1}).then((response) => {
              const res = response.data;
              if (res.errorCode == 0) {
                this.messageTip(row.status==0 ? "发布成功" : "已取消发布", 'success');
                this.getListData();
              } else {
                this.messageTip('发布失败', 'error');
              }
            });
          });
        },
        // 编辑
        handleEdit(index, row) {
          this.editID = row.id;
          Api.getDetails({id: row.id}).then((response) => {
            const res = response.data;
            if (res.errorCode == 0) {
              this.addForm = res.data.details;
              this.addVisible = true;
            }
          });
        },
        // 删除
        handleDelete(index, row) {
          this.$confirm('是否删除此条数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            Api.upMains({id: row.id, status: 9}).then((response) => {
              const res = response.data;
              if (res.errorCode == 0) {
                this.messageTip('删除成功', 'success');
                this.getListData();
              } else {
                this.messageTip('删除失败', 'error');
              }
            });
          });
        },
        // 获取table数据
        getListData () {
          let params = {};
          if (this.dateArr.length > 0) {
            params.startDate = this.dateArr[0];
            params.endDate = this.dateArr[1];
          }
          Api.getDateLists(params).then((response) => {
            const res = response.data;
            if (res.errorCode == 0) {
              const listDate = res.data.map((item) => {
                const createTime = new Date(item.createTime)
                item.createTime = Utils.formatTime(createTime);
                return item;
              });
              this.listData = listDate;
            }
          });
        },
        // 获取银行卡列表
        getBanks () {
          Api.getBanks().then((response) => {
            const res = response.data;
            if (res.errorCode == 0) {
              this.banks = res.data;
            }
          });
        },
        // 提示信息
        messageTip(text, type) {
          this.$message({
            message: text,
            type: type
          });
        }
      },
      mounted () {
        this.getListData();
        this.getBanks();
      }
  }
</script>

<style lang="scss">
  .index-div{
    .table-div{
      margin-top: 20px;
    }
    .add-div{
      .input-div{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .delete-icon{
        font-size: 18px;
        margin-left: 20px;
        cursor: pointer;
      }
      .el-input{
        margin-bottom: 10px;
      }
      .el-form-item{
        position: relative;
      }
      .delete-bank{
        position: absolute;
        right: 25px;
        top: 9px;
        font-size: 22px;
        cursor: pointer;
      }
    }
  }
  .el-textarea{
    display: inline-block;
    width: 90%;
  }
  .el-dialog{
    width: 768px !important;
  }
</style>
