<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>设备列表</span>
            <el-button size="mini" @click="myExprotExcel(ex_head,ex_key,'设别列表')"  type="primary">导出Excel</el-button>
            <el-button size="mini" @click="myPrint"  type="primary">{{erShow===false?'打印':'取消打印'}}</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>设备名称：</label>
                <div>
                    <el-input size="mini" v-model="shaixuan.devicename" filterable ></el-input>
                </div>
            </div>
            <div>
                <label>所属科室：</label>
                <div>
                    <KeShiTypeOption v-model="shaixuan.departmentid"></KeShiTypeOption>
                </div>
            </div>
            <div>
                <label>设备属性：</label>
                <div>
                    <el-select v-model="shaixuan.deviceproperty" filterable placeholder="请选择" size="mini">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="计量设备" value="0"></el-option>
                        <el-option label="公用设备" value="1"></el-option>
                        <el-option label="外账设备" value="2"></el-option>
                        <el-option label="参与成本核算" value="3"></el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <label>启用状态：</label>
                <div>
                    <el-select v-model="shaixuan.deviceproperty" filterable placeholder="请选择" size="mini">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="计量设备" value="0"></el-option>
                        <el-option label="公用设备" value="1"></el-option>
                        <el-option label="外账设备" value="2"></el-option>
                        <el-option label="参与成本核算" value="3"></el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <label>启用状态：</label>
                <div>
                    <el-select v-model="shaixuan.devicestatus" filterable placeholder="请选择" size="mini">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <el-button size="mini" @click="goSearch"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table  :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" ref="checkArr">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="使用编号" prop="device.useNum" width="170"></el-table-column>
                    <el-table-column label="设备编号" prop="device.deviceNum"></el-table-column>
                    <el-table-column label="设备名称" prop="device.devicename"></el-table-column>
                    <el-table-column label="注册证号" prop="device.registerNum"></el-table-column>
                    <el-table-column label="设备数量" prop="device.deviceCount"></el-table-column>
                    <el-table-column label="设备类型" prop="device.typeId"></el-table-column>
                    <el-table-column label="供应商" prop="device.supplier"></el-table-column>
                    <el-table-column label="出厂编号" prop="device.leaveFactoryNum"></el-table-column>
                    <el-table-column label="出厂日期" prop="device.leaveFactoryDate"></el-table-column>
                    <el-table-column label="备注" prop="device.remark"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="detail(scope.row,scope.$index)">详情</el-link>
                            <el-link type="primary" @click="breakApply(scope.row,scope.$index)">报废</el-link>
                            <el-link type="primary" @click="move(scope.row,scope.$index)">转移</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/device/devicelist')"
              @current-change="handleCurrentChange($event,'api/device/devicelist')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框-详情  -->
        <el-drawer :title="drawer_title" width="750px;" :visible.sync="drawer"  :before-close="cancel">
            <el-form :model="ruleForm1"  :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备ID："> 
                                    <span>{{ruleForm1.DeviceId}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="使用编号："> 
                                    <span>{{ruleForm1.UseNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备编号："> 
                                    <span>{{ruleForm1.DeviceNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="原设备编号："> 
                                    <span>{{ruleForm1.OldNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="注册证件号："> 
                                    <span>{{ruleForm1.RegisterNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备名称："> 
                                    <span>{{ruleForm1.Devicename}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="通用名称："> 
                                    <span>{{ruleForm1.UsallyName}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备来源："> 
                                    <span>{{ruleForm1.DeviceSource}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备原值："> 
                                    <span>{{ruleForm1.InitPrice}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备数量："> 
                                    <span>{{ruleForm1.DeviceCount}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备规格型号："> 
                                    <span>{{ruleForm1.Devicemodel}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓库："> 
                                    <span>{{ruleForm1.Roomid}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="单位："> 
                                    <span>{{ruleForm1.Unit}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备类型："> 
                                    <span>{{ruleForm1.TypeId}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="器械分类："> 
                                    <span>{{ruleForm1.QixieId}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="供应商："> 
                                    <span>{{ruleForm1.Supplier}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="品牌："> 
                                    <span>{{ruleForm1.Brand}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="生产厂商："> 
                                    <span>{{ruleForm1.Factory}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="购买日期："> 
                                    <span>{{ruleForm1.BuyDate}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="出厂编号："> 
                                    <span>{{ruleForm1.LeaveFactoryNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="出厂日期："> 
                                    <span>{{ruleForm1.LeaveFactoryDate}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备序列号："> 
                                    <span>{{ruleForm1.DeviceSerialNumber}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="维保商："> 
                                    <span>{{ruleForm1.RepairFactory}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="过保日期："> 
                                    <span>{{ruleForm1.RepairEndDate}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="发票号："> 
                                    <span>{{ruleForm1.BillNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="财务编号："> 
                                    <span>{{ruleForm1.FinaunceNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="折旧总额："> 
                                    <span>{{ruleForm1.ZhejiuTotal}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="折旧月数："> 
                                    <span>{{ruleForm1.ZhejiuMonths}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="国有资产编号："> 
                                    <span>{{ruleForm1.CountryNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="存放地点："> 
                                    <span>{{ruleForm1.ProducePlace}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="档案编号："> 
                                    <span>{{ruleForm1.DanganNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="是否计量："> 
                                    <span>{{ruleForm1.IsCount}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="外账设备："> 
                                    <span>{{ruleForm1.IsOutDevice}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="大型设备："> 
                                    <span>{{ruleForm1.IsBigdevice}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="公用设备："> 
                                    <span>{{ruleForm1.IsUseForPublic}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="效益分析："> 
                                    <span>{{ruleForm1.IsProfit}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="附资产："> 
                                    <span>{{ruleForm1.IsExtraDevice}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="自筹资金："> 
                                    <span>{{ruleForm1.SelfMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="政府拨款："> 
                                    <span>{{ruleForm1.GovermentMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="科研经费："> 
                                    <span>{{ruleForm1.ScienceMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="教学经费："> 
                                    <span>{{ruleForm1.TeachMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="接收捐款："> 
                                    <span>{{ruleForm1.DonatedMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="其他资金："> 
                                    <span>{{ruleForm1.OthersMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="备注："> 
                                    <span>{{ruleForm1.Remark}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备资料文档："> 
                                    <span>{{ruleForm1.DeviceFile}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="人员ID："> 
                                    <span>{{ruleForm1.Peopleid}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="人员名称："> 
                                    <span>{{ruleForm1.Peoplename}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="部门ID："> 
                                    <span>{{ruleForm1.Departmentid}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="24">
                            <div class="grid-content bg-purple">
                                <el-form-item label="部门名称："> 
                                    <span>{{ruleForm1.Departmentname}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        
                   </el-row>
                    
                    
                <el-form-item>
                <el-button size="mini" @click="drawer = false">取 消</el-button>
                <el-button size="mini" type="primary"  @click="drawer = false">确 定</el-button>
                </el-form-item>
                
            </el-form>
        
        </el-drawer>
        <!-- 弹框-报废申请 -->
        <el-drawer title="报废申请" width="750px;" :visible.sync="break_drawer"  :before-close="cancel">
             <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                 <el-form-item label="设备编号："> 
                    <!-- <el-input v-model="ruleForm.DeviceNum"></el-input> -->
                    <span>{{ ruleForm.DeviceNum  }}</span>
                </el-form-item>
                <el-form-item label="设备名称："> 
                    <span>{{ ruleForm.Devicename  }}</span>
                </el-form-item>
                 <el-form-item label="申请部门："> 
                     <el-input size='mini' v-model="ruleForm.DeName" :disabled="true"></el-input>
                    <!-- <el-select v-model="ruleForm.ValAndname" filterable placeholder="请选择" size="mini">
                        <el-option v-for="item in ksData" :key="item.deid" :label="item.dename" :value="item.deid+'-*-'+item.dename">
                        </el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="申请人："> 
                    <el-select v-model="ruleForm.ValAndname2" filterable placeholder="请选择" size="mini">
                        <el-option v-for="item in peopleData" :key="item.userid" :label="item.username" :value="item.userid+'-*-'+item.username">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="drawer = false">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="upload">确 定</el-button>
                </el-form-item>
             </el-form>
        </el-drawer>
        <!-- 转移 -->
        <!-- 抽屉--入库 -->
        <el-drawer title="转移"  style="overflow-y: scroll;" :visible.sync="Zh_drawer" size='30%'  direction="rtl" >
            <el-form class='drawerform demo-ruleForm'    :model="ruleForm1"  :rules="rules" ref="ruleForm1" label-width="100px"  >
                <el-form-item label="设备编号">
                    <el-input v-model="ruleForm1.DeviceNum" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input v-model="ruleForm1.Devicename" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model="ruleForm1.Brand" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="申请科室" prop="BuMeng">
                    <KeShiTypeOption v-model="ruleForm1.BuMeng"></KeShiTypeOption>
                </el-form-item>
                <el-form-item label="存放仓库"  >
                    <el-input  v-model="ruleForm1.myRoom" :disabled="true"  size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="转入仓库" >
                    <ChangKuOption v-model="ruleForm1.myNewRoom" ></ChangKuOption>
                </el-form-item>
                <el-form-item label="操作人" prop="myPeople">
                    <UserOption v-model="ruleForm1.myPeople"></UserOption>
                </el-form-item>
                <el-form-item label="数量" prop="DeviceCount">
                    <el-input v-model="ruleForm1.DeviceCount" type="number"  size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="drawer = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="myUp" >确 定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <div id='ErBox' v-if='erShow' ref="print">
            <div v-for="(item,index) in checkArr" :key='index'>
                <h4>恒华科技</h4>
                <div>
                    <div>
                    <img :src="item.url" alt="">
                </div>
                <ul>
                    <li>
                        <label>设备名称:</label><span>{{ item.device.devicename }}</span>
                    </li>
                    <li>
                        <label>注册证号:</label><span>{{ item.device.registerNum }}</span>
                    </li>
                    <li>
                        <label>品牌:</label><span>{{ item.device.brand }}</span>
                    </li>
                    <li>
                        <label>厂商:</label><span>{{ item.device.factory }}</span>
                    </li>
                    <li>
                        <label>购买日期:</label><span>{{ item.device.buyDate.split(' ')[0] }}</span>
                    </li>
                </ul>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {zmMyInit,zmMyInit4,selectData} from '../../../assets/zm-myInit'
import {addUpload_current,newInit_return,myExprotExcel} from '../../../assets/newAxios'

import UserOption from '../Child/UserOption'
import ChangKuOption from '../Child/ChangKuOption'
import KeShiTypeOption from '../Child/KeShiTypeOption'
import QRCode  from "qrcode"
export default {
    data() {
      return {
        ex_head:['使用编号','设备编号','设备名称','注册证号','设别数量','设备类型','供应商','出场编号','出场日期','备注'],
        ex_key:['useNum','deviceNum','devicename','registerNum','deviceCount','typeId','supplier','leaveFactoryNum','leaveFactoryDate','remark'],  
        Zh_drawer:false,
        isSearch:false,
        searchAPI:'api/search/devicelist',
        shaixuan:{
            IndexPage:1,
            PageSize:10,
            devicename:'',
            departmentid:'',
            deviceproperty:'',
            devicestatus:'',
            devicetypeid:'',
            factoryid:'',
            devicemodelid:'',
            dictnum:'',
            initprice:'',
            mainornot:'',
            status:'',
        },
        watch_Department:'',
        item:0,
        watch_People:'',
        item2:0,
        peopleData:[],
        ksData:[],
        labelPosition:'left',
        currentPage:1,
        pagesize:10,
        totalpage:0,
        isDisabled:true,       
        drawer:false,
        direction:'rtl',
        drawer_title:"",
        break_drawer:false,
        ruleForm1:{
            BuMeng:'',
            myPeople:'',
            myRoom:"",
            myNewRoom:'',
            DeviceCount:""
        },
        ruleForm:{
            ValAndname:'',
            ValAndname2:'',
            DevicelistId:'',
            deviceid:'',
            DeName:'',
            DeId:'',
            peopleid:'',
            peoplename:'',
        },  
        rules: {
              ksName:[
                {required:true,message:'科室名称不能为空',tirgger:'blur'}
              ]
            },
        tableData:[],
        checkArr:[],
        erShow:false
      }
    },
    components:{
        UserOption,ChangKuOption,KeShiTypeOption
    },
    mounted(){
        this.myInit('api/device/devicelist',{IndexPage:"1",PageSize:"10"})
      
        // 人员
        this.selectData('api/Select/SelectUser').then(res=>{
            this.peopleData=res.data.results
            console.log(123,this.peopleData)
        })
        // 科室
        this.selectData('api/Select/SelectKeShi').then(res=>{
            this.ksData=res.data.results
            console.log(456,this.ksData)
        })

    },
    watch:{
        currentPage:function(val){
            this.erShow=false
        },
        pagesize:function(val){
            this.erShow=false
        },
        watch_Department:function(val){
            var item=0
            if(item===0){
                item=1
            }else{
                this.ruleForm.DeId=val
            }
        },
        watch_People:function(val){
            var item2=0
            if(item2===0){
                item2=1
            }else{
                this.ruleForm.peopleid=val
            }
        }
    },
    methods:{
        myExprotExcel,
        newInit_return,
        myInit,
        myDelete,  
        mySearch,
        handleSizeChange,
        handleCurrentChange,
        addUpload,
        selectData,
        addUpload_current,
        handleSelectionChange(val) {
            this.checkArr = val
            console.log(this.checkArr)
        },
        myPrint(){
            if(this.erShow==true){
                this.erShow=false
                return
            }
            if(this.checkArr.length==0){
                this.$message.warning('请选择要打印的设备')
            }else{
                let _this=this
                for(var i=0;i<this.checkArr.length;i++){
                    (function(i){
                        QRCode.toDataURL(_this.checkArr[i].device.useNum)
                        .then(url => {
                            console.log(url)
                            _this.checkArr[i].url=url
                        })
                        .catch(err => {
                            console.error(err)
                        })
                    })(i)
                }
                this.erShow=true
                setTimeout(()=>{
                    this.$print(this.$refs.print)
                },100)
            }
        },
        myReset(){
            this.myInit('api/device/devicelist',{IndexPage:"1",PageSize:"10"})
            this.isSearch=false
            for(var key in this.shaixuan){
                this.shaixuan[key]=""
            }
        },
        goSearch(){
            this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
                console.log(res)
                this.tableData=res.data.results
            })
            this.isSearch=true
        },
        move(row,index){
            this.ruleForm1.listid=row.device.id
            this.ruleForm1.DeviceId=row.device.deviceId
            this.ruleForm1.DeviceNum=row.device.deviceNum
            this.ruleForm1.OldNum=row.device.oldNum
            this.ruleForm1.RegisterNum=row.device.registerNum
            this.ruleForm1.Devicename=row.device.devicename
            this.ruleForm1.UsallyName=row.device.usallyName
            this.ruleForm1.DeviceSource=row.device.deviceSource
            this.ruleForm1.InitPrice=row.device.initPrice
            this.ruleForm1.Devicemodel=row.device.devicemodel
            this.ruleForm1.Roomid=row.device.roomid
            this.ruleForm1.Unit=row.device.unit
            this.ruleForm1.TypeId=row.device.typeId
            this.ruleForm1.QixieId=row.device.qixieId
            this.ruleForm1.Supplier=row.device.supplier
            this.ruleForm1.Brand=row.device.brand
            this.ruleForm1.Factory=row.device.factory
            this.ruleForm1.BuyDate=row.device.buyDate
            this.ruleForm1.LeaveFactoryNum=row.device.leaveFactoryNum
            this.ruleForm1.LeaveFactoryDate=row.device.leaveFactoryDate
            this.ruleForm1.DeviceSerialNumber=row.device.deviceSerialNumber
            this.ruleForm1.RepairFactory=row.device.repairFactory
            this.ruleForm1.RepairEndDate=row.device.repairEndDate
            this.ruleForm1.BillNum=row.device.billNum
            this.ruleForm1.FinaunceNum=row.device.finaunceNum
            this.ruleForm1.ZhejiuTotal=row.device.zhejiuTotal
            this.ruleForm1.ZhejiuMonths=row.device.zhejiuMonths
            this.ruleForm1.CountryNum=row.device.countryNum
            this.ruleForm1.ProducePlace=row.device.producePlace
            this.ruleForm1.DanganNum=row.device.danganNum
            this.ruleForm1.IsCount=row.device.isCount
            this.ruleForm1.IsOutDevice=row.device.isOutDevice
            this.ruleForm1.IsBigdevice=row.device.isBigdevice
            this.ruleForm1.IsUseForPublic=row.device.isUseForPublic
            this.ruleForm1.IsProfit=row.device.isProfit
            this.ruleForm1.IsExtraDevice=row.device.isExtraDevice
            this.ruleForm1.SelfMoney=row.device.selfMoney
            this.ruleForm1.GovermentMoney=row.device.govermentMoney
            this.ruleForm1.ScienceMoney=row.device.scienceMoney
            this.ruleForm1.TeachMoney=row.device.teachMoney
            this.ruleForm1.DonatedMoney=row.device.donatedMoney
            this.ruleForm1.OthersMoney=row.device.othersMoney
            this.ruleForm1.Remark=row.device.remark
            this.ruleForm1.DeviceFile=row.device.deviceFile
            this.ruleForm1.myRoom=row.roomid+'-*-'+row.roomname
            this.Zh_drawer=true
            this.ruleForm1.DeviceCount=''
        },
        myUp(){
            var ahcArr=[]
            ahcArr.push(this.ruleForm1)
            var uploadData={
                allhc:ahcArr
            }
            var obj={
                AllData:JSON.stringify(uploadData),
                oldroomid:'',//科室间转移为空kong
                newroomid:'',//科室间转移为空kong
                olddeid:this.ruleForm1.DeviceId,
                newdeid:this.ruleForm1.BuMeng.split('-*-')[0],
                room_id:'',//科室间转移为空kong
                roomtype:1, //科室间转移
                DeId:this.ruleForm1.BuMeng.split('-*-')[0],
                DeName:this.ruleForm1.BuMeng.split('-*-')[1],
                peopleid:this.ruleForm1.myPeople.split('-*-')[0],
                peoplename:this.ruleForm1.myPeople.split('-*-')[1],
                listid:this.ruleForm1.listid,
            }
            console.log('转移-提交',obj)
            this.newInit_return('api/movedevice/move',obj).then(res=>{
                console.log(res)
                this.Zh_drawer=false
                if(res.data.response==="success"){
                    this.$message.success(res.data.results)
                    this.drawer=false
                }else{
                    this.$message.warning(res.data.results)
                }
            })
        },
        fuzhi(row){
            this.ruleForm1.UseNum=row.device.useNum
            this.ruleForm1.DeviceNum=row.device.deviceNum
            this.ruleForm1.OldNum=row.device.oldNum
            this.ruleForm1.RegisterNum=row.device.registerNum
            this.ruleForm1.Devicename=row.device.devicename
            this.ruleForm1.UsallyName=row.device.usallyName
            this.ruleForm1.DeviceSource=row.device.deviceSource
            this.ruleForm1.InitPrice=row.device.initPrice
            
            this.ruleForm1.Devicemodel=row.device.devicemodel
            this.ruleForm1.Roomid=row.device.roomid
            this.ruleForm1.Unit=row.device.unit
            this.ruleForm1.TypeId=row.device.typeId
            this.ruleForm1.QixieId=row.device.qixieId
            this.ruleForm1.Supplier=row.device.supplier
            this.ruleForm1.Brand=row.device.brand
            this.ruleForm1.Factory=row.device.buyDate
            this.ruleForm1.LeaveFactoryNum=row.device.leaveFactoryNum
            this.ruleForm1.LeaveFactoryDate=row.device.leaveFactoryDate
            this.ruleForm1.DeviceSerialNumber=row.device.deviceSerialNumber
            this.ruleForm1.RepairFactory=row.device.repairFactory
            this.ruleForm1.RepairEndDate=row.device.repairEndDate
            this.ruleForm1.BillNum=row.device.billNum
            this.ruleForm1.FinaunceNum=row.device.finaunceNum
            this.ruleForm1.ZhejiuTotal=row.device.zhejiuTotal
            this.ruleForm1.ZhejiuMonths=row.device.zhejiuMonths
            this.ruleForm1.CountryNum=row.device.countryNum
            this.ruleForm1.ProducePlace=row.device.producePlace
            this.ruleForm1.DanganNum=row.device.danganNum
            this.ruleForm1.IsCount=row.device.isCount
            this.ruleForm1.IsOutDevice=row.device.isOutDevice
            this.ruleForm1.IsBigdevice=row.device.isBigdevice
            this.ruleForm1.IsUseForPublic=row.device.isUseForPublic
            this.ruleForm1.IsProfit=row.device.isProfit
            this.ruleForm1.IsExtraDevice=row.device.isExtraDevice
            this.ruleForm1.SelfMoney=row.device.selfMoney
            this.ruleForm1.GovermentMoney=row.device.govermentMoney
            this.ruleForm1.ScienceMoney=row.device.scienceMoney
            this.ruleForm1.TeachMoney=row.device.teachMoney
            this.ruleForm1.DonatedMoney=row.device.donatedMoney
            this.ruleForm1.OthersMoney=row.device.othersMoney
            this.ruleForm1.Remark=row.device.remark
            this.ruleForm1.DeviceFile=row.device.deviceFile
            this.ruleForm1.Peopleid=row.device.peopleid
            this.ruleForm1.Peoplename=row.device.peoplename
            this.ruleForm1.Departmentid=row.device.departmentid
            this.ruleForm1.Departmentname=row.device.departmentname
            this.ruleForm1.DeviceId=row.device.deviceId
        },
        detail(row){
            this.fuzhi(row)
            this.ruleForm1.DeviceCount=row.device.deviceCount
            this.drawer_title="设备详情"
            this.drawer=true
            // this.ruleForm.DeviceId=row.id
            
        }, 
        breakApply(row){
            console.log('--baofei',row)
            this.break_drawer=true;

            this.ruleForm.Devicename=row.device.devicename
            this.ruleForm.DeviceNum=row.device.deviceNum
            this.ruleForm.DevicelistId=row.device.id
            this.ruleForm.deviceid=row.device.deviceId
            
            if(row.device.departmentname!=null){
                this.ruleForm.DeName=row.device.departmentname
                console.log('kkk')
            }
            if(row.device.DeId!=null){
                this.ruleForm.DeId=row.device.DeId
                console.log('ppp')
            }
            

        },
        upload(){ 
            this.ruleForm.peopleid=this.ruleForm.ValAndname2.split('-*-')[0]
            this.ruleForm.peoplename=this.ruleForm.ValAndname2.split('-*-')[1]
            this.addUpload_current('api/devicebreak/apply','ruleForm')
            this.break_drawer=false
        },
        cancel(){
            this.drawer=false
            this.break_drawer=false
        },
        Current_init(){
            this.myInit('api/device/devicelist',{IndexPage:"1",PageSize:"10"})    
        },
        myStop(row,index){
            console.log(row,index)
        }
    }
  }
</script>
<style>
    #ErBox>div{
        border: 1px solid red;
        width: 300px;
        text-align: center;
        position: relative;
        padding-top: 5px;
    }
    #ErBox>div>h4{
        width: 1px solid red;
        margin: 13px;
        position: absolute;
        left: 101px;
        top: 1px;
    }
    #ErBox>div>div{
        display: flex;
    }
    #ErBox>div>div>div:first-child{
        float: left;
        width: 125px;
        height: 125px;
        text-align: center;
        line-height: 125px;
        overflow: hidden;
    }
    #ErBox>div>div>ul:nth-child(2){
        float: right;
        height: 100%;
        padding-left: 0;
        text-align: left;
    }
    #ErBox>div>div>ul:nth-child(2)>li{
        line-height: 1
    }
    
    .addkeTyoestyle{
        border: 1px solid #333;
        border-bottom: 0;
    }
    .addkeTyoestyle>li{
        border-bottom:1px solid #333; 
        display: block;
        padding: 5px;
    }
    .addkeTyoestyle>li>div{
        height: 30px;
        padding-right:30px; 
    }
    .addkeTyoestyle>li>div p{
        line-height: 30px;
    }
    .addkeTyoestyle>li>div span{
        display:block;
        float: right;
        line-height: 30px;
        cursor: pointer;
        padding:0 10px ;
    }
    .el-drawer.rtl{
 
        overflow: scroll;
    }
    /* 评价 */  
    .el-radio{
        margin-right:0;
        font-size:8px;
        font-weight:100;
    }
    .el-radio__label {
        font-size: 8px;
        padding-left: 0px;
    }
</style>
