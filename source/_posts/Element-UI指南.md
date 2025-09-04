---
title: Element-UI指南
date: 2025-09-04 23:24:19
tags: [Vue, Element-UI, 前端, UI组件库]
categories: [前端开发, Vue.js]
cover: /img/elementUI-cover.png
description: Element UI 是一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库，本文详细介绍其常用组件、样式优先级和使用技巧。
---

# Element-UI 完整使用指南

Element UI 是饿了么前端团队开源的一套基于 Vue.js 2.0 的桌面端组件库，提供了丰富的组件和优雅的设计风格，极大地提升了前端开发效率。

## 一、Element UI 简介

### 1.1 特点
- **一致性**：与现实生活一致，界面元素的外观应与现实世界的元素一致
- **反馈**：通过界面样式和交互动效让用户可以清晰的感知自己的操作
- **效率**：界面简单直白，让用户快速地理解并使用
- **可控**：用户可以自由的进行操作，包括撤销、回退和终止当前操作等

### 1.2 安装方式
```bash
# NPM 安装
npm install element-ui --save

# CDN 引入
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
```

## 二、常用组件详解

### 2.1 基础组件

#### Button 按钮
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    
    <!-- 朴素按钮 -->
    <el-button plain>朴素按钮</el-button>
    <el-button type="primary" plain>主要按钮</el-button>
    
    <!-- 圆角按钮 -->
    <el-button round>圆角按钮</el-button>
    
    <!-- 图标按钮 -->
    <el-button icon="el-icon-search" circle></el-button>
  </div>
</template>
```

#### Input 输入框
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    
    <!-- 禁用状态 -->
    <el-input placeholder="请输入内容" v-model="input" :disabled="true"></el-input>
    
    <!-- 可清空 -->
    <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
    
    <!-- 密码框 -->
    <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
    
    <!-- 带图标的输入框 -->
    <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input"></el-input>
    
    <!-- 文本域 -->
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      textarea: ''
    }
  }
}
</script>
```

### 2.2 表单组件

#### Form 表单
```vue
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
```

### 2.3 数据展示组件

#### Table 表格
```vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
}
</script>
```

#### Pagination 分页
```vue
<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400">
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
```

### 2.4 导航组件

#### Menu 菜单
```vue
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    
    <el-menu-item index="1">处理中心</el-menu-item>
    
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
    </el-submenu>
    
    <el-menu-item index="3">订单管理</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
```

### 2.5 反馈组件

#### Message 消息提示
```vue
<template>
  <div>
    <el-button :plain="true" @click="open2">成功</el-button>
    <el-button :plain="true" @click="open3">警告</el-button>
    <el-button :plain="true" @click="open1">消息</el-button>
    <el-button :plain="true" @click="open4">错误</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    open1() {
      this.$message('这是一条消息提示');
    },
    open2() {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      });
    },
    open3() {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      });
    },
    open4() {
      this.$message.error('错了哦，这是一条错误消息');
    }
  }
}
</script>
```

#### Dialog 对话框
```vue
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>
```

## 三、样式优先级与自定义

### 3.1 样式优先级规则

Element UI 的样式优先级遵循 CSS 的优先级规则：

1. **内联样式** (style="...") - 优先级最高
2. **ID 选择器** (#id) - 优先级较高
3. **类选择器** (.class) - 优先级中等
4. **标签选择器** (div, p) - 优先级较低

### 3.2 样式覆盖技巧

#### 使用深度选择器
```vue
<style scoped>
/* Vue 2.x */
::v-deep .el-button {
  background-color: #67C23A;
  border-color: #67C23A;
}

/* 或者使用 /deep/ */
/deep/ .el-input__inner {
  border-radius: 20px;
}
</style>
```

#### 使用 !important
```css
.custom-button {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}
```

#### 提高选择器优先级
```css
/* 增加选择器层级 */
.custom-form .el-input__inner {
  border: 2px solid #409EFF;
}

/* 使用多个类名 */
.custom-input.el-input .el-input__inner {
  background-color: #f5f7fa;
}
```

### 3.3 主题定制

#### 在线主题生成器
Element UI 提供了在线主题定制工具，可以快速生成自定义主题。

#### 变量覆盖
```scss
/* 改变主题色变量 */
$--color-primary: #409EFF;
$--color-success: #67C23A;
$--color-warning: #E6A23C;
$--color-danger: #F56C6C;
$--color-info: #909399;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```

## 四、页面组成方式

### 4.1 布局容器

#### Container 布局容器
```vue
<template>
  <!-- 上下布局 -->
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
  
  <!-- 左右布局 -->
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
  
  <!-- 复杂布局 -->
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
```

#### Row 和 Col 栅格布局
```vue
<template>
  <div>
    <!-- 基础布局 -->
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    
    <!-- 分栏布局 -->
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    
    <!-- 分栏间隔 -->
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    
    <!-- 混合布局 -->
    <el-row :gutter="20">
      <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    
    <!-- 偏移 -->
    <el-row :gutter="20">
      <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    
    <!-- 响应式布局 -->
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

### 4.2 典型页面结构

#### 管理后台布局
```vue
<template>
  <el-container style="height: 100vh;">
    <!-- 顶部导航 -->
    <el-header style="padding: 0;">
      <div class="header-container">
        <div class="logo">
          <img src="/logo.png" alt="Logo">
          <span>管理系统</span>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="el-dropdown-link">
              用户中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          default-active="1"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF">
          
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="2-1">用户管理</el-menu-item>
            <el-menu-item index="2-2">角色管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <!-- 主要内容区域 -->
      <el-main>
        <div class="main-content">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
          
          <!-- 内容卡片 -->
          <el-card>
            <div slot="header" class="clearfix">
              <span>用户列表</span>
              <el-button style="float: right; padding: 3px 0" type="text">新增用户</el-button>
            </div>
            
            <!-- 这里放置具体内容 -->
            <div>内容区域</div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.12);
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 32px;
  margin-right: 10px;
}

.main-content {
  padding: 20px;
}

.el-aside {
  background-color: #304156;
}
</style>
```

## 五、调整方式与最佳实践

### 5.1 组件尺寸调整

#### 全局配置
```javascript
import Vue from 'vue'
import Element from 'element-ui'

Vue.use(Element, { size: 'small' })
```

#### 单独设置
```vue
<template>
  <div>
    <el-input size="medium"></el-input>
    <el-input size="small"></el-input>
    <el-input size="mini"></el-input>
  </div>
</template>
```

### 5.2 响应式设计

#### 使用栅格系统
```vue
<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <el-card>响应式卡片</el-card>
    </el-col>
  </el-row>
</template>
```

#### 媒体查询
```css
@media (max-width: 768px) {
  .el-table {
    font-size: 12px;
  }
  
  .el-button {
    padding: 8px 15px;
  }
}
```

### 5.3 性能优化

#### 按需引入
```javascript
import { Button, Select } from 'element-ui'
import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/select.css'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
```

#### 使用 babel-plugin-component
```bash
npm install babel-plugin-component -D
```

```javascript
// .babelrc
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

### 5.4 常见问题与解决方案

#### 样式冲突
```css
/* 使用命名空间避免样式冲突 */
.my-app .el-button {
  /* 自定义样式 */
}

/* 使用 CSS Modules */
.button :global(.el-button) {
  /* 自定义样式 */
}
```

#### 表单验证
```vue
<script>
export default {
  data() {
    return {
      form: {
        email: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交表单
        } else {
          return false;
        }
      });
    }
  }
}
</script>
```

## 六、总结

Element UI 作为一个成熟的 Vue.js 组件库，提供了：

1. **丰富的组件**：覆盖了大部分业务场景
2. **一致的设计**：统一的视觉风格和交互体验
3. **灵活的定制**：支持主题定制和样式覆盖
4. **完善的文档**：详细的使用说明和示例

### 使用建议

1. **合理使用组件**：根据业务需求选择合适的组件
2. **保持一致性**：在项目中统一使用 Element UI 的设计规范
3. **适度定制**：在不破坏整体风格的前提下进行个性化定制
4. **性能优化**：使用按需引入减少打包体积
5. **响应式设计**：充分利用栅格系统实现响应式布局

Element UI 能够帮助开发者快速构建美观、易用的管理界面，是 Vue.js 生态中不可或缺的重要组件库。

## 七、实战项目：豆音电商秒杀平台前端搭建

本章节将通过一个完整的电商秒杀平台项目，展示如何使用 Element UI 从零开始搭建现代化的电商前端应用。

### 7.1 项目初始化

#### 创建项目
```bash
# 使用 Vue CLI 创建项目
vue create douyin-seckill
cd douyin-seckill

# 安装 Element UI
npm install element-ui --save

# 安装其他依赖
npm install axios vue-router vuex moment --save
```

#### 项目结构
```
src/
├── components/          # 通用组件
│   ├── Header.vue      # 头部组件
│   ├── Footer.vue      # 底部组件
│   └── ProductCard.vue # 商品卡片
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   ├── SeckillList.vue # 秒杀列表
│   ├── SeckillDetail.vue # 秒杀详情
│   ├── Cart.vue        # 购物车
│   └── Order.vue       # 订单页面
├── api/                # API 接口
├── utils/              # 工具函数
├── store/              # Vuex 状态管理
└── router/             # 路由配置
```

### 7.2 配置 Element UI

#### main.js 配置
```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 自定义主题色
import './assets/css/element-variables.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

#### 自定义主题 (element-variables.scss)
```scss
/* 改变主题色变量 */
$--color-primary: #ff6b35;       // 豆音橙色
$--color-success: #67C23A;
$--color-warning: #E6A23C;
$--color-danger: #F56C6C;
$--color-info: #909399;

/* 改变 icon 字体路径变量 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";

/* 自定义样式 */
.seckill-theme {
  .el-button--primary {
    background: linear-gradient(45deg, #ff6b35, #ff8f65);
    border: none;
    
    &:hover {
      background: linear-gradient(45deg, #ff5722, #ff6b35);
    }
  }
}
```

### 7.3 页面布局搭建

#### App.vue 主框架
```vue
<template>
  <div id="app" class="seckill-theme">
    <!-- 头部导航 -->
    <Header />
    
    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- 底部 -->
    <Footer />
    
    <!-- 购物车悬浮按钮 -->
    <div class="cart-float">
      <el-badge :value="cartCount" class="item">
        <el-button 
          type="primary" 
          icon="el-icon-shopping-cart-full" 
          circle 
          size="large"
          @click="$router.push('/cart')"
        ></el-button>
      </el-badge>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapGetters(['cartCount'])
  }
}
</script>

<style>
.main-content {
  min-height: calc(100vh - 120px);
  padding-top: 80px;
}

.cart-float {
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 1000;
}
</style>
```

#### Header.vue 头部组件
```vue
<template>
  <div class="header">
    <el-container>
      <el-header height="80px">
        <div class="header-content">
          <!-- Logo -->
          <div class="logo" @click="$router.push('/')">
            <img src="/logo.png" alt="豆音秒杀">
            <span>豆音秒杀</span>
          </div>
          
          <!-- 搜索框 -->
          <div class="search-box">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索热门商品"
              prefix-icon="el-icon-search"
              @keyup.enter="handleSearch"
            >
              <el-button 
                slot="append" 
                icon="el-icon-search"
                @click="handleSearch"
              ></el-button>
            </el-input>
          </div>
          
          <!-- 用户菜单 -->
          <div class="user-menu">
            <template v-if="isLogin">
              <el-dropdown @command="handleUserCommand">
                <span class="el-dropdown-link">
                  <el-avatar :src="userInfo.avatar" size="small"></el-avatar>
                  {{ userInfo.nickname }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="orders">我的订单</el-dropdown-item>
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template v-else>
              <el-button type="text" @click="showLoginDialog = true">登录</el-button>
              <el-button type="primary" size="small" @click="showRegisterDialog = true">注册</el-button>
            </template>
          </div>
        </div>
        
        <!-- 导航菜单 -->
        <div class="nav-menu">
          <el-menu
            mode="horizontal"
            :default-active="$route.path"
            router
            background-color="transparent"
            text-color="#333"
            active-text-color="#ff6b35"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/seckill">限时秒杀</el-menu-item>
            <el-menu-item index="/category">商品分类</el-menu-item>
            <el-menu-item index="/brands">品牌专区</el-menu-item>
          </el-menu>
        </div>
      </el-header>
    </el-container>
    
    <!-- 登录对话框 -->
    <LoginDialog :visible.sync="showLoginDialog" />
    
    <!-- 注册对话框 -->
    <RegisterDialog :visible.sync="showRegisterDialog" />
  </div>
</template>

<script>
import LoginDialog from './LoginDialog.vue'
import RegisterDialog from './RegisterDialog.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',
  components: {
    LoginDialog,
    RegisterDialog
  },
  data() {
    return {
      searchKeyword: '',
      showLoginDialog: false,
      showRegisterDialog: false
    }
  },
  computed: {
    ...mapState('user', ['isLogin', 'userInfo'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    
    handleSearch() {
      if (this.searchKeyword.trim()) {
        this.$router.push({
          path: '/search',
          query: { keyword: this.searchKeyword }
        })
      }
    },
    
    handleUserCommand(command) {
      switch (command) {
        case 'profile':
          this.$router.push('/profile')
          break
        case 'orders':
          this.$router.push('/orders')
          break
        case 'logout':
          this.logout()
          this.$message.success('退出登录成功')
          break
      }
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.logo span {
  font-size: 20px;
  font-weight: bold;
  color: #ff6b35;
}

.search-box {
  flex: 1;
  max-width: 600px;
  margin: 0 50px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-menu {
  border-bottom: 1px solid #e4e7ed;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #333;
}
</style>
```

### 7.4 首页设计

#### Home.vue 首页
```vue
<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="banner-section">
      <el-carousel height="400px" indicator-position="outside">
        <el-carousel-item v-for="banner in bannerList" :key="banner.id">
          <img :src="banner.image" :alt="banner.title" @click="handleBannerClick(banner)">
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <!-- 秒杀倒计时区域 -->
    <div class="seckill-section">
      <el-card class="seckill-card">
        <div slot="header" class="seckill-header">
          <div class="seckill-title">
            <i class="el-icon-time"></i>
            <span>限时秒杀</span>
          </div>
          <div class="countdown">
            <span>距离结束还有：</span>
            <div class="countdown-time">
              <span class="time-item">{{ countdown.hours }}</span>
              <span class="separator">:</span>
              <span class="time-item">{{ countdown.minutes }}</span>
              <span class="separator">:</span>
              <span class="time-item">{{ countdown.seconds }}</span>
            </div>
          </div>
          <el-button type="primary" @click="$router.push('/seckill')">
            更多秒杀 <i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
        
        <div class="seckill-products">
          <el-row :gutter="20">
            <el-col :span="6" v-for="product in seckillProducts" :key="product.id">
              <SeckillCard :product="product" />
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    
    <!-- 商品分类 -->
    <div class="category-section">
      <el-card>
        <div slot="header">
          <span class="section-title">热门分类</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="3" v-for="category in categoryList" :key="category.id">
            <div class="category-item" @click="handleCategoryClick(category)">
              <img :src="category.icon" :alt="category.name">
              <span>{{ category.name }}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    
    <!-- 推荐商品 -->
    <div class="recommend-section">
      <el-card>
        <div slot="header">
          <span class="section-title">为你推荐</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="product in recommendProducts" :key="product.id">
            <ProductCard :product="product" />
          </el-col>
        </el-row>
        
        <!-- 加载更多 -->
        <div class="load-more">
          <el-button 
            type="primary" 
            :loading="loading"
            @click="loadMoreProducts"
          >
            {{ loading ? '加载中...' : '加载更多' }}
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import SeckillCard from '@/components/SeckillCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    SeckillCard,
    ProductCard
  },
  data() {
    return {
      loading: false,
      countdownTimer: null,
      countdown: {
        hours: '00',
        minutes: '00',
        seconds: '00'
      }
    }
  },
  computed: {
    ...mapState('home', [
      'bannerList',
      'seckillProducts',
      'categoryList',
      'recommendProducts'
    ])
  },
  async created() {
    await this.loadHomeData()
    this.startCountdown()
  },
  beforeDestroy() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer)
    }
  },
  methods: {
    ...mapActions('home', ['loadHomeData', 'loadRecommendProducts']),
    
    handleBannerClick(banner) {
      if (banner.link) {
        this.$router.push(banner.link)
      }
    },
    
    handleCategoryClick(category) {
      this.$router.push({
        path: '/category',
        query: { id: category.id }
      })
    },
    
    async loadMoreProducts() {
      this.loading = true
      try {
        await this.loadRecommendProducts()
      } finally {
        this.loading = false
      }
    },
    
    startCountdown() {
      // 假设秒杀结束时间
      const endTime = new Date()
      endTime.setHours(endTime.getHours() + 2) // 2小时后结束
      
      this.countdownTimer = setInterval(() => {
        const now = new Date()
        const diff = endTime - now
        
        if (diff <= 0) {
          clearInterval(this.countdownTimer)
          return
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        this.countdown = {
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.banner-section {
  margin-bottom: 30px;
}

.banner-section img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  cursor: pointer;
}

.seckill-section {
  margin-bottom: 30px;
}

.seckill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.seckill-title {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #ff6b35;
}

.seckill-title i {
  margin-right: 8px;
  font-size: 24px;
}

.countdown {
  display: flex;
  align-items: center;
  gap: 10px;
}

.countdown-time {
  display: flex;
  align-items: center;
}

.time-item {
  background: #ff6b35;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.separator {
  margin: 0 5px;
  font-weight: bold;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-item:hover {
  background: #f5f7fa;
  border-radius: 8px;
}

.category-item img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.load-more {
  text-align: center;
  margin-top: 30px;
}

.category-section,
.recommend-section {
  margin-bottom: 30px;
}
</style>
```

### 7.5 秒杀商品卡片组件

#### SeckillCard.vue
```vue
<template>
  <div class="seckill-card">
    <el-card :body-style="{ padding: '0px' }">
      <div class="product-image">
        <img :src="product.image" :alt="product.name">
        <div class="seckill-badge">秒杀</div>
      </div>
      
      <div class="product-info">
        <h4 class="product-name">{{ product.name }}</h4>
        
        <div class="price-section">
          <span class="seckill-price">¥{{ product.seckillPrice }}</span>
          <span class="original-price">¥{{ product.originalPrice }}</span>
        </div>
        
        <div class="progress-section">
          <div class="progress-info">
            <span>已抢购 {{ product.soldCount }}件</span>
            <span>库存 {{ product.stock }}件</span>
          </div>
          <el-progress 
            :percentage="salePercentage" 
            :stroke-width="8"
            color="#ff6b35"
          ></el-progress>
        </div>
        
        <div class="action-section">
          <el-button 
            type="primary" 
            size="small" 
            :disabled="!canBuy"
            @click="handleSeckill"
            block
          >
            {{ buttonText }}
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SeckillCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    salePercentage() {
      const total = this.product.soldCount + this.product.stock
      return Math.round((this.product.soldCount / total) * 100)
    },
    
    canBuy() {
      return this.product.stock > 0 && this.product.status === 'active'
    },
    
    buttonText() {
      if (this.product.stock <= 0) {
        return '已抢完'
      }
      if (this.product.status === 'waiting') {
        return '即将开始'
      }
      if (this.product.status === 'ended') {
        return '已结束'
      }
      return '立即抢购'
    }
  },
  methods: {
    handleSeckill() {
      if (!this.canBuy) return
      
      this.$router.push({
        path: '/seckill/detail',
        query: { id: this.product.id }
      })
    }
  }
}
</script>

<style scoped>
.seckill-card {
  height: 100%;
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.seckill-card:hover .product-image img {
  transform: scale(1.05);
}

.seckill-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff6b35;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.product-info {
  padding: 15px;
}

.product-name {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price-section {
  margin-bottom: 15px;
}

.seckill-price {
  color: #ff6b35;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

.original-price {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
}

.progress-section {
  margin-bottom: 15px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.action-section .el-button {
  width: 100%;
}
</style>
```

### 7.6 秒杀详情页

#### SeckillDetail.vue
```vue
<template>
  <div class="seckill-detail" v-if="product">
    <el-container>
      <el-main>
        <el-row :gutter="30">
          <!-- 商品图片 -->
          <el-col :span="12">
            <div class="product-gallery">
              <div class="main-image">
                <img :src="currentImage" :alt="product.name">
              </div>
              <div class="thumbnail-list">
                <div 
                  v-for="(image, index) in product.images" 
                  :key="index"
                  class="thumbnail-item"
                  :class="{ active: currentImage === image }"
                  @click="currentImage = image"
                >
                  <img :src="image" :alt="product.name">
                </div>
              </div>
            </div>
          </el-col>
          
          <!-- 商品信息 -->
          <el-col :span="12">
            <div class="product-detail">
              <div class="seckill-status">
                <el-tag type="danger" size="large">
                  <i class="el-icon-time"></i>
                  限时秒杀
                </el-tag>
                <div class="countdown">
                  距离结束：
                  <span class="time">{{ countdown.hours }}</span>:
                  <span class="time">{{ countdown.minutes }}</span>:
                  <span class="time">{{ countdown.seconds }}</span>
                </div>
              </div>
              
              <h1 class="product-title">{{ product.name }}</h1>
              <p class="product-subtitle">{{ product.subtitle }}</p>
              
              <div class="price-info">
                <div class="seckill-price">
                  <span class="label">秒杀价：</span>
                  <span class="price">¥{{ product.seckillPrice }}</span>
                </div>
                <div class="original-price">
                  <span class="label">原价：</span>
                  <span class="price">¥{{ product.originalPrice }}</span>
                </div>
                <div class="discount">
                  省 ¥{{ (product.originalPrice - product.seckillPrice).toFixed(2) }}
                </div>
              </div>
              
              <div class="stock-info">
                <div class="stock-progress">
                  <div class="stock-text">
                    <span>仅剩 {{ product.stock }} 件</span>
                    <span>已抢 {{ product.soldCount }} 件</span>
                  </div>
                  <el-progress 
                    :percentage="salePercentage" 
                    :stroke-width="12"
                    color="#ff6b35"
                  ></el-progress>
                </div>
              </div>
              
              <div class="spec-selection">
                <div class="spec-item">
                  <span class="spec-label">规格：</span>
                  <el-radio-group v-model="selectedSpec">
                    <el-radio-button 
                      v-for="spec in product.specs" 
                      :key="spec.id"
                      :label="spec.id"
                    >
                      {{ spec.name }}
                    </el-radio-button>
                  </el-radio-group>
                </div>
                
                <div class="quantity-item">
                  <span class="spec-label">数量：</span>
                  <el-input-number 
                    v-model="quantity" 
                    :min="1" 
                    :max="Math.min(5, product.stock)"
                    size="small"
                  ></el-input-number>
                  <span class="limit-text">限购5件</span>
                </div>
              </div>
              
              <div class="action-buttons">
                <el-button 
                  type="danger" 
                  size="large"
                  :disabled="!canBuy"
                  :loading="buying"
                  @click="handleSeckill"
                >
                  <i class="el-icon-lightning"></i>
                  立即秒杀
                </el-button>
                <el-button 
                  type="primary" 
                  size="large"
                  :disabled="!canBuy"
                  @click="addToCart"
                >
                  <i class="el-icon-shopping-cart-2"></i>
                  加入购物车
                </el-button>
              </div>
              
              <div class="service-info">
                <el-row>
                  <el-col :span="8">
                    <i class="el-icon-truck"></i>
                    包邮
                  </el-col>
                  <el-col :span="8">
                    <i class="el-icon-refresh"></i>
                    7天无理由退货
                  </el-col>
                  <el-col :span="8">
                    <i class="el-icon-medal"></i>
                    正品保证
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
        
        <!-- 商品详情 -->
        <div class="product-description">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="商品详情" name="detail">
              <div v-html="product.description"></div>
            </el-tab-pane>
            <el-tab-pane label="规格参数" name="specs">
              <el-table :data="product.parameters" border>
                <el-table-column prop="name" label="参数名称"></el-table-column>
                <el-table-column prop="value" label="参数值"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="用户评价" name="reviews">
              <div class="reviews-section">
                <div v-for="review in product.reviews" :key="review.id" class="review-item">
                  <div class="review-user">
                    <el-avatar :src="review.userAvatar" size="small"></el-avatar>
                    <span>{{ review.username }}</span>
                    <el-rate v-model="review.rating" disabled show-score></el-rate>
                  </div>
                  <p class="review-content">{{ review.content }}</p>
                  <div class="review-images" v-if="review.images">
                    <img v-for="img in review.images" :key="img" :src="img" alt="评价图片">
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
    
    <!-- 秒杀成功对话框 -->
    <el-dialog
      title="秒杀成功！"
      :visible.sync="successDialogVisible"
      width="400px"
      center
    >
      <div class="success-content">
        <i class="el-icon-success" style="font-size: 60px; color: #67C23A;"></i>
        <p>恭喜您成功抢到商品！</p>
        <p>请在15分钟内完成支付</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="successDialogVisible = false">稍后支付</el-button>
        <el-button type="primary" @click="goToPay">立即支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SeckillDetail',
  data() {
    return {
      product: null,
      currentImage: '',
      selectedSpec: null,
      quantity: 1,
      activeTab: 'detail',
      buying: false,
      successDialogVisible: false,
      countdown: {
        hours: '00',
        minutes: '00',
        seconds: '00'
      },
      countdownTimer: null
    }
  },
  computed: {
    salePercentage() {
      if (!this.product) return 0
      const total = this.product.soldCount + this.product.stock
      return Math.round((this.product.soldCount / total) * 100)
    },
    
    canBuy() {
      return this.product && this.product.stock > 0 && this.selectedSpec
    }
  },
  async created() {
    await this.loadProductDetail()
    this.startCountdown()
  },
  beforeDestroy() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer)
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    
    async loadProductDetail() {
      const productId = this.$route.query.id
      // 模拟API调用
      // const product = await api.getSeckillProduct(productId)
      this.product = {
        id: productId,
        name: '华为Mate50 Pro 5G手机',
        subtitle: '麒麟9000芯片，影像旗舰',
        seckillPrice: 3999,
        originalPrice: 6999,
        stock: 50,
        soldCount: 150,
        images: [
          '/products/phone1.jpg',
          '/products/phone2.jpg',
          '/products/phone3.jpg'
        ],
        specs: [
          { id: 1, name: '8GB+256GB 昆仑玻璃版' },
          { id: 2, name: '8GB+512GB 昆仑玻璃版' }
        ],
        description: '<div>商品详情内容...</div>',
        parameters: [
          { name: '屏幕尺寸', value: '6.74英寸' },
          { name: '处理器', value: '麒麟9000' }
        ],
        reviews: [
          {
            id: 1,
            username: '用户1',
            userAvatar: '/avatar1.jpg',
            rating: 5,
            content: '手机很好用，拍照效果不错'
          }
        ]
      }
      
      this.currentImage = this.product.images[0]
      this.selectedSpec = this.product.specs[0].id
    },
    
    async handleSeckill() {
      this.buying = true
      try {
        // 模拟秒杀API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.successDialogVisible = true
        this.product.stock--
        this.product.soldCount++
      } catch (error) {
        this.$message.error('秒杀失败，请重试')
      } finally {
        this.buying = false
      }
    },
    
    async addToCart() {
      const cartItem = {
        productId: this.product.id,
        name: this.product.name,
        image: this.currentImage,
        price: this.product.seckillPrice,
        specId: this.selectedSpec,
        quantity: this.quantity
      }
      
      await this.addToCart(cartItem)
      this.$message.success('已加入购物车')
    },
    
    goToPay() {
      this.successDialogVisible = false
      this.$router.push('/order/pay')
    },
    
    startCountdown() {
      // 假设秒杀在2小时后结束
      const endTime = new Date()
      endTime.setHours(endTime.getHours() + 2)
      
      this.countdownTimer = setInterval(() => {
        const now = new Date()
        const diff = endTime - now
        
        if (diff <= 0) {
          clearInterval(this.countdownTimer)
          return
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        this.countdown = {
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.seckill-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-gallery .main-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.thumbnail-list {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.thumbnail-item {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}

.thumbnail-item.active {
  border-color: #ff6b35;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.seckill-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(45deg, #fff5f5, #ffe6e6);
  border-radius: 8px;
}

.countdown .time {
  background: #ff6b35;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 2px;
}

.product-title {
  font-size: 24px;
  color: #333;
  margin: 0 0 10px 0;
}

.product-subtitle {
  color: #666;
  margin-bottom: 20px;
}

.price-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.seckill-price .price {
  font-size: 28px;
  color: #ff6b35;
  font-weight: bold;
}

.original-price .price {
  color: #999;
  text-decoration: line-through;
}

.discount {
  color: #67C23A;
  font-weight: bold;
  margin-top: 10px;
}

.stock-info {
  margin-bottom: 20px;
}

.stock-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.spec-selection {
  margin-bottom: 30px;
}

.spec-item, .quantity-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.spec-label {
  width: 80px;
  color: #333;
  font-weight: bold;
}

.limit-text {
  margin-left: 10px;
  color: #999;
  font-size: 12px;
}

.action-buttons {
  margin-bottom: 30px;
}

.action-buttons .el-button {
  width: 48%;
  height: 50px;
  font-size: 16px;
}

.action-buttons .el-button:first-child {
  margin-right: 4%;
}

.service-info {
  text-align: center;
  color: #666;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.service-info .el-col {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.product-description {
  margin-top: 40px;
}

.success-content {
  text-align: center;
  padding: 20px;
}

.review-item {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.review-user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.review-images img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 4px;
}
</style>
```

### 7.7 状态管理 (Vuex)

#### store/index.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'
import cart from './modules/cart'
import seckill from './modules/seckill'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    user,
    cart,
    seckill
  }
})
```

#### store/modules/cart.js
```javascript
const state = {
  items: [],
  total: 0
}

const mutations = {
  ADD_TO_CART(state, product) {
    const existingItem = state.items.find(item => 
      item.productId === product.productId && item.specId === product.specId
    )
    
    if (existingItem) {
      existingItem.quantity += product.quantity
    } else {
      state.items.push(product)
    }
    
    state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  
  REMOVE_FROM_CART(state, index) {
    state.items.splice(index, 1)
    state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  
  UPDATE_QUANTITY(state, { index, quantity }) {
    state.items[index].quantity = quantity
    state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  
  CLEAR_CART(state) {
    state.items = []
    state.total = 0
  }
}

const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
  },
  
  removeFromCart({ commit }, index) {
    commit('REMOVE_FROM_CART', index)
  },
  
  updateQuantity({ commit }, payload) {
    commit('UPDATE_QUANTITY', payload)
  },
  
  clearCart({ commit }) {
    commit('CLEAR_CART')
  }
}

const getters = {
  cartCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
  cartItems: state => state.items,
  cartTotal: state => state.total
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

### 7.8 移动端适配

#### 响应式样式
```css
/* 全局响应式样式 */
@media (max-width: 768px) {
  .home {
    padding: 10px;
  }
  
  .banner-section img {
    height: 200px;
  }
  
  .seckill-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .countdown {
    flex-direction: column;
    text-align: center;
  }
  
  .seckill-products .el-col {
    margin-bottom: 20px;
  }
  
  .category-item {
    padding: 15px 10px;
  }
  
  .category-item img {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 10px;
  }
  
  .search-box {
    margin: 0 20px;
  }
  
  .seckill-products .el-col {
    flex: 0 0 50%;
    max-width: 50%;
  }
  
  .category-section .el-col {
    flex: 0 0 25%;
    max-width: 25%;
  }
  
  .recommend-section .el-col {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
```

### 7.9 性能优化建议

1. **组件懒加载**
```javascript
// router/index.js
const Home = () => import('@/views/Home.vue')
const SeckillDetail = () => import('@/views/SeckillDetail.vue')
```

2. **图片懒加载**
```vue
<template>
  <img v-lazy="product.image" :alt="product.name">
</template>
```

3. **按需引入 Element UI**
```javascript
import { Button, Card, Row, Col } from 'element-ui'
```

4. **虚拟滚动**（对于长列表）
```vue
<template>
  <el-virtual-list
    :data="productList"
    :data-key="'id'"
    :data-sources="dataSource"
    :estimate-size="200"
  >
    <template v-slot="{ item }">
      <ProductCard :product="item" />
    </template>
  </el-virtual-list>
</template>
```

通过以上完整的实战案例，您可以看到如何使用 Element UI 构建一个功能完整的电商秒杀平台。项目涵盖了从基础组件使用到复杂业务逻辑实现，从页面布局到性能优化等各个方面，是学习和实践 Element UI 的excellent示例。

---

> 本文介绍了 Element UI 的核心功能和使用方法，更多详细信息请参考 [Element UI 官方文档](https://element.eleme.io/)。