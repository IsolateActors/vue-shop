(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["cate-params"],{1276:function(e,t,a){"use strict";var r=a("d784"),n=a("44e7"),i=a("825a"),s=a("1d80"),l=a("4840"),o=a("8aa5"),c=a("50c4"),u=a("14c3"),d=a("9263"),p=a("d039"),m=[].push,f=Math.min,g=4294967295,b=!p((function(){return!RegExp(g,"y")}));r("split",2,(function(e,t,a){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,a){var r=String(s(this)),i=void 0===a?g:a>>>0;if(0===i)return[];if(void 0===e)return[r];if(!n(e))return t.call(r,e,i);var l,o,c,u=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,b=new RegExp(e.source,p+"g");while(l=d.call(b,r)){if(o=b.lastIndex,o>f&&(u.push(r.slice(f,l.index)),l.length>1&&l.index<r.length&&m.apply(u,l.slice(1)),c=l[0].length,f=o,u.length>=i))break;b.lastIndex===l.index&&b.lastIndex++}return f===r.length?!c&&b.test("")||u.push(""):u.push(r.slice(f)),u.length>i?u.slice(0,i):u}:"0".split(void 0,0).length?function(e,a){return void 0===e&&0===a?[]:t.call(this,e,a)}:t,[function(t,a){var n=s(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,n,a):r.call(String(n),t,a)},function(e,n){var s=a(r,e,this,n,r!==t);if(s.done)return s.value;var d=i(e),p=String(this),m=l(d,RegExp),h=d.unicode,v=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(b?"y":"g"),x=new m(b?d:"^(?:"+d.source+")",v),_=void 0===n?g:n>>>0;if(0===_)return[];if(0===p.length)return null===u(x,p)?[p]:[];var y=0,C=0,w=[];while(C<p.length){x.lastIndex=b?C:0;var k,R=u(x,b?p:p.slice(C));if(null===R||(k=f(c(x.lastIndex+(b?0:C)),p.length))===y)C=o(p,C,h);else{if(w.push(p.slice(y,C)),w.length===_)return w;for(var $=1;$<=R.length-1;$++)if(w.push(R[$]),w.length===_)return w;C=y=k}}return w.push(p.slice(y)),w}]}),!b)},"14c3":function(e,t,a){var r=a("c6b6"),n=a("9263");e.exports=function(e,t){var a=e.exec;if("function"===typeof a){var i=a.call(e,t);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return n.call(e,t)}},"174e":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("商品管理")]),a("el-breadcrumb-item",[e._v("参数列表")])],1),a("el-card",[a("el-alert",{attrs:{title:"注意:只允许为第三级分类设置相应参数!",type:"warning",closable:!1,"show-icon":""}}),a("el-row",{staticClass:"cat-opt"},[a("el-col",[a("span",[e._v("选择商品分类: ")]),a("el-cascader",{attrs:{options:e.cateList,props:e.cateProps},on:{change:e.selectCateChange},model:{value:e.selectCateKeys,callback:function(t){e.selectCateKeys=t},expression:"selectCateKeys"}})],1)],1),a("el-tabs",{on:{"tab-click":e.tabClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"动态参数",name:"many"}},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.btnIsDisabled},on:{click:function(t){e.addDialogVisible=!0}}},[e._v("添加参数")]),a("el-table",{attrs:{data:e.manyTableData,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._l(t.row.attr_vals,(function(r,n){return a("el-tag",{key:n,attrs:{closable:""},on:{close:function(a){return e.removeAttrVal(n,t.row)}}},[e._v(e._s(r))])})),t.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return e.handleInputConfirm(t.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"enter",13,a.key,"Enter")?null:e.handleInputConfirm(t.row)}},model:{value:t.row.inputValue,callback:function(a){e.$set(t.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return e.showInput(t.row)}}},[e._v("+ New Tag")])]}}])}),a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"参数名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(a){return e.editDialog(t.row.attr_id)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-edit"},on:{click:function(a){return e.removeParams(t.row.attr_id)}}},[e._v("删除")])]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"静态属性",name:"only"}},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.btnIsDisabled},on:{click:function(t){e.addDialogVisible=!0}}},[e._v("添加属性")]),a("el-table",{attrs:{data:e.onlyTableData,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._l(t.row.attr_vals,(function(r,n){return a("el-tag",{key:n,attrs:{closable:""},on:{close:function(a){return e.removeAttrVal(n,t.row)}}},[e._v(e._s(r))])})),t.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return e.handleInputConfirm(t.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"enter",13,a.key,"Enter")?null:e.handleInputConfirm(t.row)}},model:{value:t.row.inputValue,callback:function(a){e.$set(t.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return e.showInput(t.row)}}},[e._v("+ New Tag")])]}}])}),a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"属性名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(a){return e.editDialog(t.row.attr_id)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-edit"},on:{click:function(a){return e.removeParams(t.row.attr_id)}}},[e._v("删除")])]}}])})],1)],1)],1)],1),a("el-dialog",{attrs:{title:"添加"+e.titleText,visible:e.addDialogVisible,width:"30%"},on:{"update:visible":function(t){e.addDialogVisible=t},close:e.addFormClosed}},[a("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:e.titleText,prop:"attr_name"}},[a("el-input",{model:{value:e.addForm.attr_name,callback:function(t){e.$set(e.addForm,"attr_name",t)},expression:"addForm.attr_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addParams}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改"+e.titleText,visible:e.editDialogVisible,width:"30%"},on:{"update:visible":function(t){e.editDialogVisible=t},close:e.editFormClosed}},[a("el-form",{ref:"editFormRef",attrs:{model:e.editForm,rules:e.addRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:e.titleText,prop:"attr_name"}},[a("el-input",{model:{value:e.editForm.attr_name,callback:function(t){e.$set(e.editForm,"attr_name",t)},expression:"editForm.attr_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.editParams}},[e._v("确 定")])],1)],1)],1)},n=[],i=(a("99af"),a("4160"),a("a15b"),a("fb6a"),a("a434"),a("ac1f"),a("1276"),a("498a"),a("159b"),a("2909")),s=(a("96cf"),a("1da1")),l={data:function(){return{cateList:[],cateProps:{expandTrigger:"hover",value:"cat_id",label:"cat_name",children:"children"},selectCateKeys:[],activeName:"many",manyTableData:[],onlyTableData:[],addDialogVisible:!1,addForm:{attr_name:"",attr_sel:"",attr_vals:""},addRules:{attr_name:[{required:!0,message:"请输入需要添加的名称",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}]},editDialogVisible:!1,editForm:{},inputVisible:!1,inputValue:""}},computed:{btnIsDisabled:function(){return 3!==this.selectCateKeys.length},cateId:function(){return 3!==this.selectCateKeys.length?null:this.selectCateKeys[2]},titleText:function(){return"many"==this.activeName?"动态参数":"静态属性"}},methods:{getCateList:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/categories");case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取分类列表失败!"));case 6:e.cateList=r.data;case 7:case"end":return t.stop()}}),t)})))()},selectCateChange:function(){if(3!==this.selectCateKeys.length)return this.selectCateKeys=[],this.manyTableData=[],void(this.onlyTableData=[]);this.getParamsData()},tabClick:function(){this.getParamsData()},getParamsData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/categories/".concat(e.cateId,"/attributes"),{params:{sel:e.activeName}});case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取参数列表失败!"));case 6:r.data.forEach((function(e){e.attr_vals=e.attr_vals?e.attr_vals.split(","):[],e.inputVisible=!1,e.inputValue=""})),"many"===e.activeName?e.manyTableData=r.data:e.onlyTableData=r.data;case 8:case"end":return t.stop()}}),t)})))()},addFormClosed:function(){this.$refs.addFormRef.resetFields()},addParams:function(){var e=this;this.$refs.addFormRef.validate(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$axios.post("categories/".concat(e.cateId,"/attributes"),{attr_name:e.addForm.attr_name,attr_sel:e.activeName});case 4:if(r=t.sent,n=r.data,201===n.meta.status){t.next=8;break}return t.abrupt("return",e.$message.error("添加".concat(e.titleText,"失败!")));case 8:e.$message.success("添加".concat(e.titleText,"成功!")),e.getParamsData(),e.addDialogVisible=!1;case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},editFormClosed:function(){this.$refs.editFormRef.resetFields()},editDialog:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$axios.get("categories/".concat(t.cateId,"/attributes/").concat(e),{params:{attr_sel:t.activeName}});case 2:if(r=a.sent,n=r.data,200===n.meta.status){a.next=6;break}return a.abrupt("return",t.$message.error("获取".concat(t.titleText,"失败!")));case 6:t.editForm=n.data,t.editDialogVisible=!0;case 8:case"end":return a.stop()}}),a)})))()},editParams:function(){var e=this;this.$refs.editFormRef.validate(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$axios.put("categories/".concat(e.cateId,"/attributes/").concat(e.editForm.attr_id),{attr_name:e.editForm.attr_name,attr_sel:e.activeName,attr_vals:e.editForm.attr_vals});case 4:if(r=t.sent,n=r.data,200===n.meta.status){t.next=8;break}return t.abrupt("return",e.$message.error("修改".concat(e.titleText,"失败!")));case 8:e.$message.success("修改".concat(e.titleText,"成功!")),e.getParamsData(),e.editDialogVisible=!1;case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},removeParams:function(e){var t=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$axios.delete("categories/".concat(t.cateId,"/attributes/").concat(e));case 2:if(r=a.sent,n=r.data,200===n.meta.status){a.next=6;break}return a.abrupt("return",t.$message.error("删除失败!"));case 6:t.$message({type:"success",message:"删除成功!"}),t.getParamsData();case 8:case"end":return a.stop()}}),a)})))).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},handleInputConfirm:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(0!==e.inputValue.trim().length){a.next=4;break}return e.inputValue="",e.inputVisible=!1,a.abrupt("return");case 4:return r=Object(i["a"])(e.attr_vals),r.push(e.inputValue.trim()),a.next=8,t.$axios.put("categories/".concat(t.cateId,"/attributes/").concat(e.attr_id),{attr_name:e.attr_name,attr_sel:e.attr_sel,attr_vals:r.join(",")});case 8:if(n=a.sent,s=n.data,200===s.meta.status){a.next=12;break}return a.abrupt("return",t.$message.error("添加失败!"));case 12:t.$message.success("添加成功!"),e.attr_vals.push(e.inputValue.trim()),e.inputValue="",e.inputVisible=!1;case 16:case"end":return a.stop()}}),a)})))()},showInput:function(e){var t=this;e.inputVisible=!0,this.$nextTick((function(){t.$refs.saveTagInput.$refs.input.focus()}))},removeAttrVal:function(e,t){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var n,i,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=t.attr_vals.slice(),n.splice(e,1),r.next=4,a.$axios.put("categories/".concat(a.cateId,"/attributes/").concat(t.attr_id),{attr_name:t.attr_name,attr_sel:t.attr_sel,attr_vals:n.join(",")});case 4:if(i=r.sent,s=i.data,200===s.meta.status){r.next=8;break}return r.abrupt("return",a.$message.error("删除失败!"));case 8:a.$message.success("删除成功!"),t.attr_vals.splice(e,1);case 10:case"end":return r.stop()}}),r)})))()}},created:function(){this.getCateList()}},o=l,c=(a("d118"),a("2877")),u=Object(c["a"])(o,r,n,!1,null,"72b54a88",null);t["default"]=u.exports},"44e7":function(e,t,a){var r=a("861d"),n=a("c6b6"),i=a("b622"),s=i("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[s])?!!t:"RegExp"==n(e))}},"498a":function(e,t,a){"use strict";var r=a("23e7"),n=a("58a8").trim,i=a("c8d2");r({target:"String",proto:!0,forced:i("trim")},{trim:function(){return n(this)}})},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var r=a("1d80"),n=a("5899"),i="["+n+"]",s=RegExp("^"+i+i+"*"),l=RegExp(i+i+"*$"),o=function(e){return function(t){var a=String(r(t));return 1&e&&(a=a.replace(s,"")),2&e&&(a=a.replace(l,"")),a}};e.exports={start:o(1),end:o(2),trim:o(3)}},"6a8b":function(e,t,a){},8818:function(e,t,a){},"8aa5":function(e,t,a){"use strict";var r=a("6547").charAt;e.exports=function(e,t,a){return t+(a?r(e,t).length:1)}},9263:function(e,t,a){"use strict";var r=a("ad6d"),n=a("9f7f"),i=RegExp.prototype.exec,s=String.prototype.replace,l=i,o=function(){var e=/a/,t=/b*/g;return i.call(e,"a"),i.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=n.UNSUPPORTED_Y||n.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=o||u||c;d&&(l=function(e){var t,a,n,l,d=this,p=c&&d.sticky,m=r.call(d),f=d.source,g=0,b=e;return p&&(m=m.replace("y",""),-1===m.indexOf("g")&&(m+="g"),b=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(f="(?: "+f+")",b=" "+b,g++),a=new RegExp("^(?:"+f+")",m)),u&&(a=new RegExp("^"+f+"$(?!\\s)",m)),o&&(t=d.lastIndex),n=i.call(p?a:d,b),p?n?(n.input=n.input.slice(g),n[0]=n[0].slice(g),n.index=d.lastIndex,d.lastIndex+=n[0].length):d.lastIndex=0:o&&n&&(d.lastIndex=d.global?n.index+n[0].length:t),u&&n&&n.length>1&&s.call(n[0],a,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(n[l]=void 0)})),n}),e.exports=l},"9f7f":function(e,t,a){"use strict";var r=a("d039");function n(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=n("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=n("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},a434:function(e,t,a){"use strict";var r=a("23e7"),n=a("23cb"),i=a("a691"),s=a("50c4"),l=a("7b0b"),o=a("65f0"),c=a("8418"),u=a("1dde"),d=a("ae40"),p=u("splice"),m=d("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,g=Math.min,b=9007199254740991,h="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!p||!m},{splice:function(e,t){var a,r,u,d,p,m,v=l(this),x=s(v.length),_=n(e,x),y=arguments.length;if(0===y?a=r=0:1===y?(a=0,r=x-_):(a=y-2,r=g(f(i(t),0),x-_)),x+a-r>b)throw TypeError(h);for(u=o(v,r),d=0;d<r;d++)p=_+d,p in v&&c(u,d,v[p]);if(u.length=r,a<r){for(d=_;d<x-r;d++)p=d+r,m=d+a,p in v?v[m]=v[p]:delete v[m];for(d=x;d>x-r+a;d--)delete v[d-1]}else if(a>r)for(d=x-r;d>_;d--)p=d+r-1,m=d+a-1,p in v?v[m]=v[p]:delete v[m];for(d=0;d<a;d++)v[d+_]=arguments[d+2];return v.length=x-r+a,u}})},ac1f:function(e,t,a){"use strict";var r=a("23e7"),n=a("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==n},{exec:n})},c091:function(e,t,a){"use strict";a("6a8b")},c8ca:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("商品管理")]),a("el-breadcrumb-item",[e._v("商品分类")])],1),a("el-card",[a("el-row",[a("el-col",[a("el-button",{attrs:{type:"primary"},on:{click:e.showAddCateDialog}},[e._v(" 添加分类 ")])],1)],1),a("tree-table",{staticClass:"tree-table",attrs:{"index-text":"#",data:e.catelist,columns:e.columns,"selection-type":!1,"expand-type":!1,"show-index":!0,border:!0},scopedSlots:e._u([{key:"isok",fn:function(e){return[!1===e.row.cat_deleted?a("i",{staticClass:"el-icon-success",staticStyle:{color:"#67C23A"}}):a("i",{staticClass:"el-icon-error",staticStyle:{color:"#F56C6C"}})]}},{key:"sort",fn:function(t){return[0===t.row.cat_level?a("el-tag",{attrs:{size:"mini"}},[e._v("一级")]):1===t.row.cat_level?a("el-tag",{attrs:{size:"mini",type:"success"}},[e._v("二级")]):a("el-tag",{attrs:{size:"mini",type:"warning"}},[e._v("三级")])]}},{key:"opt",fn:function(){return[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"}},[e._v("删除")])]},proxy:!0}])}),a("el-pagination",{attrs:{"current-page":e.paramsObj.pagenum,"page-sizes":[1,2,5,10],"page-size":e.paramsObj.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"添加分类",visible:e.addCateDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addCateDialogVisible=t},close:e.addCateDialogClosed}},[a("el-form",{ref:"addCateFormRef",attrs:{model:e.addCateForm,rules:e.addCateRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"分类名称",prop:"cat_name"}},[a("el-input",{model:{value:e.addCateForm.cat_name,callback:function(t){e.$set(e.addCateForm,"cat_name",t)},expression:"addCateForm.cat_name"}})],1),a("el-form-item",{attrs:{label:"父级分类"}},[a("el-cascader",{attrs:{options:e.parentCateList,props:e.cascaderProps,clearable:""},on:{change:e.parentCateChange},model:{value:e.selectKeys,callback:function(t){e.selectKeys=t},expression:"selectKeys"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.addCateDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addCate}},[e._v("确 定")])],1)],1)],1)},n=[],i=(a("96cf"),a("1da1")),s={data:function(){return{catelist:[],paramsObj:{type:3,pagenum:1,pagesize:5},total:0,columns:[{label:"分类名称",prop:"cat_name",minWidth:"155px"},{label:"是否有效",type:"template",template:"isok"},{label:"排序",type:"template",template:"sort"},{label:"操作",type:"template",template:"opt",minWidth:"185px"}],addCateDialogVisible:!1,addCateForm:{cat_pid:0,cat_name:"",cat_level:0},addCateRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}]},parentCateList:[],cascaderProps:{expandTrigger:"hover",value:"cat_id",label:"cat_name",children:"children",checkStrictly:!0},selectKeys:[]}},methods:{getCateList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/categories",{params:e.paramsObj});case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取分类失败！"));case 6:e.catelist=r.data.result,e.total=r.data.total;case 8:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.paramsObj.pagesize=e,this.paramsObj.pagenum=1,this.getCateList()},handleCurrentChange:function(e){this.paramsObj.pagenum=e,this.getCateList()},showAddCateDialog:function(){this.getParentCateList(),this.addCateDialogVisible=!0},getParentCateList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/categories",{params:{type:2}});case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取父级分类失败!"));case 6:e.parentCateList=r.data;case 7:case"end":return t.stop()}}),t)})))()},parentCateChange:function(e){this.selectKeys.length>0?(this.addCateForm.cat_pid=this.selectKeys[this.selectKeys.length-1],this.addCateForm.cat_level=this.selectKeys.length):(this.addCateForm.cat_pid=0,this.addCateForm.cat_level=0)},addCate:function(){var e=this;this.$refs.addCateFormRef.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$axios.post("/categories",e.addCateForm);case 4:if(r=t.sent,n=r.data,201===n.meta.status){t.next=8;break}return t.abrupt("return",e.$message.error("创建失败!"));case 8:e.$message.success("创建成功!"),e.getCateList(),e.addCateDialogVisible=!1;case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},addCateDialogClosed:function(){this.$refs.addCateFormRef.resetFields(),this.selectKeys=[],this.addCateForm.cat_pid=0,this.addCateForm.cat_level=0}},created:function(){this.getCateList()}},l=s,o=(a("c091"),a("2877")),c=Object(o["a"])(l,r,n,!1,null,"67b132aa",null);t["default"]=c.exports},c8d2:function(e,t,a){var r=a("d039"),n=a("5899"),i="​᠎";e.exports=function(e){return r((function(){return!!n[e]()||i[e]()!=i||n[e].name!==e}))}},d118:function(e,t,a){"use strict";a("8818")},d784:function(e,t,a){"use strict";a("ac1f");var r=a("6eeb"),n=a("d039"),i=a("b622"),s=a("9263"),l=a("9112"),o=i("species"),c=!n((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=i("replace"),p=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),m=!n((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var a="ab".split(e);return 2!==a.length||"a"!==a[0]||"b"!==a[1]}));e.exports=function(e,t,a,d){var f=i(e),g=!n((function(){var t={};return t[f]=function(){return 7},7!=""[e](t)})),b=g&&!n((function(){var t=!1,a=/a/;return"split"===e&&(a={},a.constructor={},a.constructor[o]=function(){return a},a.flags="",a[f]=/./[f]),a.exec=function(){return t=!0,null},a[f](""),!t}));if(!g||!b||"replace"===e&&(!c||!u||p)||"split"===e&&!m){var h=/./[f],v=a(f,""[e],(function(e,t,a,r,n){return t.exec===s?g&&!n?{done:!0,value:h.call(t,a,r)}:{done:!0,value:e.call(a,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),x=v[0],_=v[1];r(String.prototype,e,x),r(RegExp.prototype,f,2==t?function(e,t){return _.call(e,this,t)}:function(e){return _.call(e,this)})}d&&l(RegExp.prototype[f],"sham",!0)}}}]);
//# sourceMappingURL=cate-params.8ccfe253.js.map