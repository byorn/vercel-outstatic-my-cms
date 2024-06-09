---
title: 'Initialise GO Project and Import Packages'
status: 'published'
author:
  name: 'Byorn John De Silva'
  picture: 'https://avatars.githubusercontent.com/u/962948?v=4'
slug: 'initialise-go-project-and-import-packages'
description: 'How to initialise and import Go packages'
coverImage: ''
tags: [{"label":"Golang","value":"golang"}]
publishedAt: '2024-06-09T08:50:22.852Z'
---

\[ Tip: Easy way to update your Go version in MacOs &gt; brew install go \]

- Initialise Go project

  ```go
  go mod init github.com/byorn/go-helloworld
  ```

  ![](/images/screenshot-2024-06-09-at-6.06.04-pm-I5Nj.png)
- Add the dependency by importing it directly in your code

  *in main.go and func main method*

  ```go
  import (
      "fmt"
      "github.com/byorn/go-helloworld/util"
      util2 "github.com/byorn/test-go-modules/util"
  )
  func main(){
  fmt.Println(util2.ThisIsSomeMethodToBeCalledFromAnotherRepository())
  ```

  you might get the below error:
- ![](/images/screenshot-2024-06-09-at-6.29.27-pm-A0Mz.png)
- you should download the dependant package 

  ```go
  > go get github.com.byorn/test-go-modules
  
  > go mod tidy
  ```

  finally run the main file

  ```go
  > go run main.go
  ```

  [The dependant repository is: here](https://github.com/byorn/test-go-modules/blob/main/util/filereader.go)
- ![](/images/screenshot-2024-06-09-at-6.41.44-pm-czNj.png)