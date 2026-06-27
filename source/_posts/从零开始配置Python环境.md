---
title: 从零开始配置Python环境
date: 2026-03-05 14:05:23
cover: /img/PythonStart.webp
categories:
  - 技术教程
tags:
  - Python
  - 教程
  - 环境配置
---

这篇教程的目标很明确：在你的电脑上把 Python 环境搭好，跑通第一行代码，并且为后续开发配好顺手的工具。

全文分三个层次，你可以按需要读到对应的位置停下来：

- **基础配置**（第 1-3 步）：装好 Python，能跑 `Hello World`
- **进阶工具**（第 4 步）：安装 PyCharm，告别简陋的 IDLE
- **工程化环境管理**（第 5 步）：用 Conda 隔离不同项目的 Python 环境

---

## 第一步：下载 Python 安装包

1. 打开浏览器，访问 Python 官方网站：[https://www.python.org/](https://www.python.org/)
2. 将鼠标悬停在页面顶部的 **Downloads**（下载）按钮上
3. 网站会自动识别你的操作系统（例如 Windows），直接点击出现的黄色按钮，例如 **"Python 3.1x.x"**（下载最新版即可）
4. 等待浏览器完成下载

## 第二步：安装 Python

下载完成后，你会得到一个类似 `python-3.x.x-amd64.exe` 的安装程序。

1. **双击**运行这个安装程序
2. **⚠️ 极其重要：** 在安装界面正下方，有一个选项叫 **"Add python.exe to PATH"**（有些版本叫 "Add Python 3.x to PATH"），**一定要把这个框勾选上**

   > 如果不勾选，你的电脑系统会"找不到"你刚刚安装的 Python 在哪里。

3. 勾选之后，点击界面中间的 **"Install Now"**（立即安装）
4. 稍等片刻，直到界面显示 **"Setup was successful"**，然后点击 **"Close"** 关闭窗口

## 第三步：验证安装是否成功

1. 按住键盘上的 **`Win` 键**（左下角 Ctrl 和 Alt 之间那个微软图标的键），然后同时按下 **`R` 键**
2. 屏幕左下角会弹出"运行"对话框，输入 `cmd`，点击确定
3. 在出现的黑色窗口中输入：

   ```bash
   python --version
   ```

4. 敲下回车。如果屏幕上出现类似 `Python 3.12.2` 的字样，说明 Python 已经成功安装并被系统识别了

---

## 第四步：写下并运行你的第一行代码

环境搭好了，现在来跑编程界最经典的仪式：`Hello World`。

Python 自带一个轻量编辑器叫 **IDLE**，不需要额外安装任何东西，直接用它来验证即可。

1. 按一下 `Win` 键，在搜索框里输入 `IDLE`
2. 在搜索结果中找到 **"IDLE (Python 3.x ...)"**，点击打开
3. 你会看到一个白色窗口（Python Shell），光标前有三个大于号 `>>>`
4. 在光标处输入：

   ```python
   print("Hello World")
   ```

   > **注意：** 括号 `()` 和双引号 `""` 必须是**英文半角**符号，不能是中文全角。

5. 敲下回车，你会看到：

   ```text
   Hello World
   ```

到这一步，你的 Python 环境已经完全就绪了。如果只是偶尔写几行脚本，IDLE 就够用了。但如果你想正经写项目，继续往下看。

---

## 第五步：安装专业编辑器 —— PyCharm

IDLE 适合尝鲜，但当你需要写多文件项目、调试代码、管理依赖时，它就显得不够用了。**PyCharm** 是目前最受 Python 开发者欢迎的集成开发环境（IDE）。

### 下载 PyCharm（社区版）

PyCharm 有两个版本：专业版（收费）和社区版（免费）。初学者用**社区版 (Community Edition)** 完全够用。

1. 打开浏览器，前往 PyCharm 下载页：[https://www.jetbrains.com/pycharm/download/](https://www.jetbrains.com/pycharm/download/)
2. 在页面上往下翻，找到 **"PyCharm Community Edition"**
3. 点击黑色的 **"Download"** 按钮，等待下载完成

### 安装 PyCharm

1. **双击运行**下载好的安装包（文件名类似 `pycharm-community-xxxx.x.x.exe`）
2. 在欢迎界面中一路点击 **"Next"**
3. ⚠️ **在 "Installation Options"（安装选项）这一步，建议勾选以下内容：**
   - **Create Desktop Shortcut**：勾选 `PyCharm Community Edition`（桌面快捷方式）
   - **Update Context Menu**：勾选 `Add "Open Folder as Project"`（右键菜单快速打开项目）
   - **Create Associations**：勾选 `.py`（双击 `.py` 文件默认用 PyCharm 打开）
4. 继续一路 **"Next"**，点击 **"Install"** 开始安装
5. 安装完成后勾选 "Run PyCharm Community Edition"，点击 **"Finish"**

### 创建你的第一个项目

1. 第一次打开 PyCharm 时，可能会弹出许可协议窗口，勾选左下角的 **"I confirm..."**，点击 **"Continue"**
2. 在欢迎界面点击醒目的 **"New Project"**（新建项目）按钮
3. 第一行 **"Location"**（位置）可以选择代码保存的文件夹，比如 `D:\PythonProjects\MyFirstProject`
4. 下方的 **"Base interpreter"**（基础解释器）通常会自动识别出刚才安装的 Python（例如 Python 3.x.x），确认无误后点击右下角的 **"Create"**
5. 等几秒钟，PyCharm 就会帮你搭好项目结构

### 在 PyCharm 中写代码并运行

1. 在左侧目录树中，右键点击项目名（比如 MyFirstProject）
2. 选择 **"New" → "Python File"**
3. 给文件起个名字，比如 `hello`，按回车
4. 在右侧代码编辑区输入：

   ```python
   print("Hello PyCharm!")
   ```

5. 在编辑区**空白处右键**，选择带有绿色三角形图标的 **"Run 'hello'"**
6. 屏幕下方会弹出运行面板，显示：

   ```text
   Hello PyCharm!
   ```

到此，你已经有了一套完整的 Python 开发环境。

---

## 第六步：进阶 —— 用 Conda 管理多个 Python 环境

随着你学习和开发的项目越来越多，会遇到一个现实问题：项目 A 需要 Python 3.8 和某个旧版库，项目 B 需要 Python 3.12 和最新版库。把所有东西装在同一个环境里，迟早会冲突。

**Conda** 就是用来解决这个问题的 —— 它可以为每个项目创建相互隔离的独立 Python 环境，互不干扰。

### 安装 Miniconda

Conda 有两个发行版：Anaconda（庞大，包含上千个数据科学包）和 Miniconda（精简，只含核心组件）。推荐使用**Miniconda**，轻量且够用。

1. 打开浏览器，前往清华大学开源镜像站（下载速度更快）：
   [https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/)
2. 在文件列表底部找到适合你系统的安装包，Windows 用户通常选择 `Miniconda3-latest-Windows-x86_64.exe`
3. **双击运行**，一路点击 **"Next"** 和 **"I Agree"**
4. ⚠️ **在 "Advanced Options"（高级选项）界面：**
   - **不要**勾选 "Add Miniconda3 to my PATH environment variable"（避免和之前的 Python 冲突）
   - **建议勾选** "Register Miniconda3 as my default Python 3.x"
   - **建议勾选** "Clear the package cache upon completion"
5. 点击 **"Install"**，完成后点击 **"Finish"**

### 创建并使用独立环境

1. 按 `Win` 键，在开始菜单中找到 **"Anaconda Prompt (Miniconda3)"**，点击打开
2. 命令行开头会显示 `(base)`，表示你已经在 Conda 的默认基础环境中
3. 创建一个名为 `my_env`、使用 Python 3.10 的独立环境：

   ```bash
   conda create --name my_env python=3.10
   ```

4. 当出现 `Proceed ([y]/n)?` 时，输入 `y` 并回车，等待自动下载完成
5. "进入"这个新环境：

   ```bash
   conda activate my_env
   ```

   命令行开头的 `(base)` 变成了 `(my_env)`——说明你已经切换到了独立环境。

以后每个项目都可以创建自己的专属环境，搞砸了也没关系，删掉重建只需要几秒钟。

### 让 PyCharm 使用 Conda 环境

1. 打开 PyCharm，进入你的项目
2. 点击顶部菜单 **"File" → "Settings"**（Mac 为 "PyCharm" → "Preferences"）
3. 在左侧列表中找到 **"Project: 你的项目名"**，展开后点击 **"Python Interpreter"**
4. 点击右侧的 **"Add Interpreter" → "Add Local Interpreter..."**
5. 左侧选择 **"Conda Environment"**，右侧选中 **"Use existing environment"**
6. 在下拉菜单中选择你刚创建的 `my_env`（如果找不到，手动浏览到 Miniconda 安装目录下的 `_conda.exe` 或 `condabin\conda.bat`）
7. 点击 **"OK"** 保存

配置完成后，看 PyCharm 界面**右下角**状态栏，解释器名称是不是已经变成了包含 `(my_env)` 字样的版本号？这说明 PyCharm 已经连上了你的 Conda 环境。

---

> **💡 进阶阅读**
> 想要了解更多 Conda 的高级用法（查看所有环境、删除环境、包安装与导出等）？
> 👉 请点击阅读：**{% post_link Conda手册 %}**
