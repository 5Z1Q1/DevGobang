---
title: 从零开始配置Python环境
date: 2026-03-05 14:05:23
categories:
  - 技术教程
tags:
  - Python
  - 教程
  - 环境配置
---

# 从零开始配置 Python 开发环境

这篇教程将手把手带你完成 Python 环境的配置，并在你的电脑上运行第一行代码 —— `Hello World`。

## 第一步：下载 Python 安装包

1. 打开浏览器，访问 Python 的官方网站：[https://www.python.org/](https://www.python.org/)
2. 将鼠标悬停在页面顶部的 **Downloads**（下载）按钮上。
3. 网站会自动识别你所使用的操作系统（例如 Windows）。直接点击下面出现的黄色按钮，例如 **"Python 3.1x.x"**（这里的数字代表版本号，下载最新版即可）。
4. 等待浏览器完成下载。

## 第二步：安装 Python

下载完成后，你会得到一个类似 `python-3.x.x-amd64.exe` 的安装程序。

1. **双击**运行这个安装程序。
2. **⚠️ 极其重要的一步：** 在出现的安装界面**正下方**，有一个选项叫 **"Add python.exe to PATH"**（有些版本叫 "Add Python 3.x to PATH"），**一定要把这个框勾选上！**
   > *（科普：如果不勾选，你的电脑系统会“找不到”你刚刚安装的 Python 在哪里。）*
3. 勾选之后，点击界面中间的 **"Install Now"**（立即安装）。
4. 稍等片刻，直到界面显示 **"Setup was successful"**（安装成功），然后点击 **"Close"** 关闭窗口。

## 第三步：验证安装是否成功

安装完了，怎样确认它能正常工作呢？

1. 按住键盘上的 **`Win` 键**（带有微软四个方块图标的键，通常在左下角 Ctrl 和 Alt 之间），然后同时按下 **`R` 键**。
2. 屏幕左下角会弹出一个**“运行”**对话框，在输入框中输入英文字母 `cmd`，然后点击确定。
3. 此时会出现一个黑色的窗口（命令提示符）。在闪烁的光标处输入：
   ```bash
   python --version
   ```
4. 敲下**回车键**。如果屏幕上出现了一行字，比如 `Python 3.12.2`（版本号可能会有所不同），那么恭喜你，Python 已经成功安装并被系统识别了！

## 第四步：写下并运行你的第一行代码

环境已经全部搞定，现在让我们来运行编程界最经典的入门仪式：`Hello World`。

Python 自带了一个非常适合新手的代码编辑器，叫做 **IDLE**，我们可以直接用它来写代码。

1. 点击电脑屏幕左下角的 **"开始"** 菜单（或者按一下 `Win` 键），在弹出的搜索框里直接输入 `IDLE`。
2. 在搜索结果中，你会看到一个名为 **"IDLE (Python 3.x ...)"** 的软件，点击打开它。
3. 这时会弹出一个白色的窗口，这个叫 Python Shell。你会看到闪烁的光标前有三个大于号 `>>>`。
4. 在光标处输入下面这行代码：

   ```python
   print("Hello World")
   ```
   > **注意：** 代码中的括号 `()` 和双引号 `""` **必须是英文半角状态**下输入的符号，不能是中文全角的哦！

5. 敲下**回车键**。

你会在下一行看到程序输出的结果：
```text
Hello World
```

---

## Python 基础语法

现在你已经成功运行了第一行代码，让我们再来尝试一些更好玩的例子！继续在 IDLE 的 `>>>` 提示符后输入以下代码。

### 把电脑当计算器用（基础数学运算）

Python 天然就是一个非常强大的计算器。试试输入：

```python
8 + 5
```
按下回车，你会看到 `13`。

再试试稍微复杂的乘除法和括号合并：
```python
(50 - 5 * 6) / 4
```
按下回车，你会得到 `5.0`。（注意：在编程中 `*` 代表乘号，`/` 代表除号）

### 认识“变量” —— 给数据贴个标签

在编程中，我们经常要把一些数据存起来，这就需要用到“变量”。你可以把变量想象成一个小纸箱，我们在纸箱侧面写上名字（变量名），然后把东西（数据）放进去。

```python
name = "alice"
age = 18
```
这两行代码敲完按回车后没有任何输出，但是 Python 已经在脑海里记住了：系统里有个叫 `name` 的箱子，里面装着文本 `"alice"`；还有个被叫作 `age` 的箱子，里面装着数字 `18`。

现在让我们把它们一起打印出来：
```python
print("My name is", name, "，I am", age, "years old.")
```
输出结果会是：
`My name is alice ，I am 18 years old.`

### 和 Python 对话 —— 接收键盘输入

程序不仅能单向输出，它还能接收你输入的信息。复制下面这行代码试试：

```python
your_name = input("Please enter your name: ")
print("Hello, ", your_name, "! Nice to meet you.")
```
（在 IDLE 的 Shell 界面里，你可能需要将这两行分别输入）。按下回车后，程序会打印“Please enter your name: ”并停下来等你打字。当你输入完自己的名字并按回车后，它就会用你的名字来跟你打招呼了！

### 简单的逻辑判断 —— 让电脑帮你做决定

让电脑根据不同的情况做不同的事，这就是编程最核心的魅力。

```python
weather = "Rainy"

if weather == "Rainy":
    print("Remember to take an umbrella!")
else:
    print("Go to the park and have fun!")
```
> **⚠️ 格式警告：** 在 `print` 前面有四个空格的 **缩进**！在 Python 里，缩进是非常重要的语法，它告诉电脑“这两行代码是属于上面 if 或者是 else 的一部分”。如果你在使用 IDLE，输入带有冒号 `:` 的行并按回车，下一行会自动帮你空出四个空格。

尝试把 `weather = "Rainy"` 换成 `weather = "Sunny"` 然后再运行一次判断逻辑，你能猜到结果是什么吗？

---

## 正式进入Python编程 —— 安装 PyCharm

在前面的体验中，我们使用的是 Python 自带的简易编辑器 IDLE。对于刚开始敲几行代码来说它很方便，但当你以后需要写更长的代码、开发复杂的项目时，IDLE 就显得不够用了。

这时候，我们需要一款更强大、更顺手的专业工具。**PyCharm** 是目前最受 Python 开发者欢迎的代码编辑器（专业称呼叫集成开发环境 IDE）之一。

### 下载 PyCharm (社区版)

PyCharm 提供了两个版本：“专业版”（收费）和“社区版”（免费）。对于初学者来说，**社区版 (Community Edition)** 的功能已经完全足够使用了。

1. 打开浏览器，前往 PyCharm 官方网站：[https://www.jetbrains.com/pycharm/download/](https://www.jetbrains.com/pycharm/download/)
2. 在下载页面上往下翻，找到 **"PyCharm Community Edition"**。
3. 点击黑色的 **"Download"** 按钮，等待安装包下载完成。

### 安装 PyCharm

1. **双击运行**下载好的安装包（如果是 Windows 电脑，文件名类似于 `pycharm-community-xxxx.x.x.exe`）。
2. 在出现的欢迎界面中，一直点击 **"Next"**（下一步）。
3. ⚠️ **中间有一步 "Installation Options"（安装选项），建议勾选以下内容：**
   - **Create Desktop Shortcut**: 勾选 `PyCharm Community Edition`。（在桌面上创建一个快捷方式，方便以后打开，如果你喜欢把常用软件都放在桌面上）
   - **Update Context Menu**: 勾选 `Add "Open Folder as Project"`。（右键菜单快捷打开项目，非常实用）
   - **Create Associations**: 勾选 `.py`。（让你双击所有的 `.py` Python 代码文件时，都默认使用 PyCharm 打开）
4. 继续一路 **"Next"**，最后点击 **"Install"** 开始安装。
5. 安装进度条走完后，勾选上 "Run PyCharm Community Edition"，然后点击 **"Finish"**，它就会自动启动了！

### 用 PyCharm 创建你的第一个项目

当你第一次打开 PyCharm 时：

1. 可能会弹出一个许可协议的窗口，勾选左下角的 **"I confirm..."**，然后点击 **"Continue"**。
2. 接着你会看到一个欢迎界面，点击那个醒目的 **"New Project"**（新建项目）按钮。
3. 在新页面的第一行 **"Location"**（位置），你可以选择要把代码保存在电脑的哪个文件夹里，比如 `D:\PythonProjects\MyFirstProject`。
4. 这里比较关键：在这个界面的下方，有一个 **"Base interpreter"**（基础解释器）的选项。由于我们刚把 Python 安装好，下拉菜单中通常会自动出现刚才装好的 Python（例如 Python 3.x.x）。确认无误后，直接点击右下角的 **"Create"**（创建）。
5. 耐心等几秒钟，PyCharm 就会帮你搭建好项目结构了。

### 在 PyCharm 中写代码并运行

1. 在左侧的目录树中，右键点击你的项目名字（比如 MyFirstProject）。
2. 选择菜单首项 **"New" -> "Python File"**。
3. 给这个代码文件起个名字，比如输入 `hello`，然后按回车。
4. 现在，在右边宽敞的代码编辑区里，重新打出那句经典的魔法咒语：

```python
print("Hello PyCharm!")
```

5. 代码写完后，怎么运行呢？非常简单：在代码编辑区的**空白处点击右键**，然后选择带有绿色三角形播放图标的 **"Run 'hello'"**（运行 'hello'）。
6. 这时，屏幕的正下方就会打开一个新的面板，里面清晰地打印着：
```text
Hello PyCharm!
```

🎉 **大功告成！**

---

## 进阶：如何优雅地管理多个 Python 环境 —— 安装 Conda

随着你学习得越来越深入，你可能会同时开发好几个不同的项目。比如，项目 A 需要使用 Python 3.8，而项目 B 需要使用最新的 Python 3.12；或者不同项目需要用到同一个工具的完全不同版本。如果把所有东西都装在电脑默认的同一个环境里，很容易产生冲突，导致程序跑不起来。

为了解决这个问题，专业的开发者通常会使用 **Conda**。它就像是一个专门为 Python 准备的“虚拟机管家”，可以为你的每个项目创建相互隔离的专属 Python 环境。

### 认识 Miniconda

Conda 有两个主要的发行版：Anaconda（庞大，包含了上千个数据科学包，非常占空间）和 Miniconda（精简，只包含最核心的 Python 运行环境和 conda 工具）。对于绝大多数开发者来说，轻量小巧的 **Miniconda** 是最佳选择。

### 下载并安装 Miniconda

1. 打开浏览器，为了更快的下载速度，我们可以前往清华大学开源软件镜像站下载 Miniconda：
   [https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/)
2. 在文件列表中向下翻，找到适合你电脑系统的安装包。如果你是 Windows 电脑，通常选择文件列表最底部类似 `Miniconda3-latest-Windows-x86_64.exe` 的文件下载。
3. **双击运行**下载好的安装包。
4. 一路点击 **"Next"** 和 **"I Agree"**。
5. ⚠️ **关键的安装选项：** 在 "Advanced Options"（高级选项）界面，你可能会看到几个复选框：
   - 一般建议**不要**勾选 "Add Miniconda3 to my PATH environment variable"（不推荐将其加入 PATH 环境变量，以免和之前的 Python 冲突）。
   - 建议**勾选** "Register Miniconda3 as my default Python 3.x"（将其注册为默认的 Python 环境）。
   - 建议**勾选** "Clear the package cache upon completion"（安装完成后清理缓存，以节省电脑存储空间）。
6. 点击 **"Install"** 开始安装，绿条走完后点击 "Finish" 结束。

### 创建并进入你的第一个独立环境

1. 按下电脑的 `Win` 键打开开始菜单，在刚安装的程序中，你会发现一个叫 **"Anaconda Prompt (Miniconda3)"** 的快捷方式。
2. 点击打开它，你会看到一个全新的黑色命令行窗口。请注意，它的命令行开头多了一个 `(base)` 的字样！这就代表你已经身处 Conda 的默认基础环境中了。
3. 接着，我们来创建一个崭新的、完全独立的 Python 3.10 环境（我们给它取个名字叫 `my_env`）。在窗口中输入：
   ```bash
   conda create --name my_env python=3.10
   ```
   按下回车。
4. 当屏幕上弹出一大串文本，并询问你 `Proceed ([y]/n)?`（是否继续）时，输入字母 `y` 并按下回车。Conda 就会开始自动帮你下载并搭建这个新家。
5. 稍等片刻，搭建完成后，系统会提示你如何使用它。输入下面这行命令来“进入”这个新房间：
   ```bash
   conda activate my_env
   ```
   按下回车后，见证奇迹的时刻到了：命令行最前面的 `(base)` 变成了 `(my_env)`！

现在，你就可以在这个纯净的“新房间”里随意折腾了！如果在实际项目中你不小心把环境搞得一团糟，没关系，用 Conda 删掉重来只要几秒钟。保持良好的环境隔离习惯，是你迈向高级 Python 玩家的坚实一步。

### 让 PyCharm 连上 Conda 环境

我们刚才在命令行里用 Conda 建好了 `my_env`，怎么让此前安装的 PyCharm 知道并且使用它呢？

1. 打开 PyCharm，并在你刚才创建的项目中。
2. 在顶部菜单栏点击 **"File"** -> **"Settings"**（Mac 系统则点击左上角 "PyCharm" -> "Preferences"）。
3. 在弹窗的左侧列表中找到 **"Project: 你的项目名"**，展开它并点击 **"Python Interpreter"**（Python 解释器）。
4. 在右侧靠上的位置，点击 **"Add Interpreter"**，然后选择 **"Add Local Interpreter..."**。
5. 在左侧菜单中点击 **"Conda Environment"**。
6. 接着在右侧选中 **"Use existing environment"**（使用现有环境）。
7. 点击下拉箭头，通常 PyCharm 会自动识别出你刚刚创建的 `my_env` 环境。选中它！（如果它提示找不到 conda executable，你需要手动点击文件夹图标，找到你安装 Miniconda 目录下的 `_conda.exe` 或 `condabin\conda.bat`）。
8. 一路点击右下角的 **"OK"** 保存。

配置好后，你可以看一下 PyCharm 界面**最右下角**的状态栏，解释器的名字是不是已经变成了包含 `(my_env)` 字样的版本号了？

这说明，你的 PyCharm 已和环境管家 Conda 完美结合！以后写不同项目的代码，只要在这里切换不同的环境就可以无缝无冲突地工作了。

---

> **💡 进阶阅读**
> 想要了解更多关于 Conda 的高级用法（如查看所有环境、删除环境、包安装与导出等详细命令）？
> 👉 请点击阅读：**{% post_link Conda手册 %}** 
