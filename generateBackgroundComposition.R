# Contrast and color diversity of harvesters (Arachnida: Opiliones) predict detection by predators: a citizen science game
# Ximenes et al.

# Script to generate semi-artificial backgrounds from vegetation individual items
# created by Felipe Gawryszewski

setwd("") #set working directory
library(magick)
library(imager)
library(dplyr)

#Function
compo<-function(img1, img2,
                #reduction=1,
                offset1=c(0,1920+200), #final image size=1920x1080
                offset2=c(0,1080+200),
                operator="Atop") {
  
    img2<-image_background(img2, color="none", flatten=FALSE) 
    
    flip<-rbinom(n=1, size=1, prob=0.5) #assumes binomial distribution to mirror up/down and left/right
    flop<-rbinom(n=1, size=1, prob=0.5)
    if (flip==1) {
      img2<-image_flip(img2)
    }
    if (flop==1) {
      img2<-image_flop(img2)
    }
    
    img2<-image_rotate(img2, round(runif(n=1,0,359))) #uniform distribution for rotation of each item
    
    .offset1<-round(runif(n=1, offset1[[1]], offset1[[2]])) #uniform distribution for the coordinates as well
    .offset2<-round(runif(n=1, offset2[[1]], offset2[[2]]))
    sign1<-if(.offset1<0){"-"} else {"+"} #assigns the minus sign to values less than zero
    sign2<-if(.offset2<0){"-"} else {"+"}
    offset<-paste0(sign1,abs(.offset1),sign2,abs(.offset2)) #generates the string with random coordinates
    img<-image_composite(image=img1,
                         operator=operator,
                         composite_image=img2,
                         offset = offset)
    return(img)
  
}


#Background image
bkg<-image_blank(width=1920+200,
                 height=1080+200,
                 color = "white",
                 pseudo_image = "",
                 defines = NULL)


#Number of image samples

#list and shuffle image files
files <- list.files(path = "", #set path
                       pattern = "\\.png$", full.names = TRUE)
shuffled_files <- sample(files)
groups <- split(shuffled_files, ceiling(seq_along(shuffled_files) / 6))

#Create image
create_bg<-function(all.imgs,path){
  
  samp.fun<-function(prob=0.3, size=c(length(all.imgs)-1)) {
    samp<-rbinom(n=1, size=size, prob=prob)
    samp<-samp+1
    return(samp)
  }

all.imgs<-all.imgs[sample(1:length(all.imgs))]
N_samples=500
bkg1<-bkg
for (i in 1:N_samples) {
  print(i)
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-compo(img1=bkg1, img2=all.imgs[ samp.fun() ])
  bkg1<-image_flatten(bkg1)
  gc()
}

bkg2<-image_chop(bkg1, geometry = "200x200")
bkg2

#Save image
image_write(bkg2, path=path)
}

capture.output(groups, file = "Bgs1to10.txt")
create_bg(all.imgs=image_read(groups[[1]]),path="bg1.png") 
create_bg(all.imgs=image_read(groups[[2]]),path="bg2.png")
create_bg(all.imgs=image_read(groups[[3]]),path="bg3.png") 
create_bg(all.imgs=image_read(groups[[4]]),path="bg4.png")
create_bg(all.imgs=image_read(groups[[5]]),path="bg5.png") 
create_bg(all.imgs=image_read(groups[[6]]),path="bg6.png")
create_bg(all.imgs=image_read(groups[[7]]),path="bg7.png") 
create_bg(all.imgs=image_read(groups[[8]]),path="bg8.png")
create_bg(all.imgs=image_read(groups[[9]]),path="bg9.png") 
create_bg(all.imgs=image_read(groups[[10]]),path="bg10.png")


# rerun sample files
shuffled_files <- sample(files)
groups <- split(shuffled_files, ceiling(seq_along(shuffled_files) / 6))

capture.output(groups, file = "Bgs11to20.txt")
create_bg(all.imgs=image_read(groups[[1]]),path="bg11.png")
create_bg(all.imgs=image_read(groups[[2]]),path="bg12.png")
create_bg(all.imgs=image_read(groups[[3]]),path="bg13.png")
create_bg(all.imgs=image_read(groups[[4]]),path="bg14.png")
create_bg(all.imgs=image_read(groups[[5]]),path="bg15.png")
create_bg(all.imgs=image_read(groups[[6]]),path="bg16.png")
create_bg(all.imgs=image_read(groups[[7]]),path="bg17.png")
create_bg(all.imgs=image_read(groups[[8]]),path="bg18.png")
create_bg(all.imgs=image_read(groups[[9]]),path="bg19.png")
create_bg(all.imgs=image_read(groups[[10]]),path="bg20.png")

# rerun sample files
shuffled_files <- sample(files)
groups <- split(shuffled_files, ceiling(seq_along(shuffled_files) / 6))
capture.output(groups, file = "Bgs21-vergrupo1.txt")

create_bg(all.imgs=image_read(groups[[1]]),path="bg21.png")
