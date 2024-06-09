---
title: 'Initialise GO Project and Import Packages'
status: 'draft'
author:
  name: 'Byorn John De Silva'
  picture: 'https://avatars.githubusercontent.com/u/962948?v=4'
slug: 'initialise-go-project-and-import-packages'
description: 'How to initialise and import Go packages'
coverImage: ''
tags: [{"label":"Golang","value":"golang"}]
publishedAt: '2024-06-09T08:50:22.852Z'
---

\[ Tip: Easy way to  update your Go version in MacOs &gt; brew install go \]

1. Initialise Go project

   ```go
   go mod init github.com/byorn/go-helloworld
   ```

   ![](/images/screenshot-2024-06-09-at-6.06.04-pm-I5Nj.png)
2. Add the dependency by importing it directly in your code

   *in main.go and func main method*

   ```
   import (
       "fmt"
       "github.com/byorn/go-helloworld/util"
       util2 "github.com/byorn/test-go-modules/util"
   )
   func main(){
   fmt.Println(util2.ThisIsSomeMethodToBeCalledFromAnotherRepository())
   ```

   you might get the below error:
3. ![](/images/screenshot-2024-06-09-at-6.29.27-pm-A0Mz.png)