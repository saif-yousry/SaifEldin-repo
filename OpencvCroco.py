import cv2
import numpy as np

croco = cv2.imread("C:/Users/Cyber/Downloads/OPENCV/crocomarine.png")
opencv = cv2.imread("C:/Users/Cyber/Downloads/OPENCV/opencv.png")

height = int(opencv.shape[1]*0.4 )
width = int(opencv.shape[0] *0.4)
opencv_resized = cv2.resize(opencv, (width, height), interpolation=cv2.INTER_AREA)

x, y = 0, 0
y1, y2 = y, y + opencv_resized.shape[1]
x1, x2 = x, x + opencv_resized.shape[0]
blank=np.zeros((croco.shape[1],croco.shape[0],3),dtype='uint8')
blank[x1:x2,y1:y2]=opencv_resized
gray=cv2.cvtColor(blank,cv2.COLOR_BGR2GRAY)

th,thresh=cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV)

masked=cv2.bitwise_and(croco,croco,mask=thresh)
final=blank+masked
cv2.imshow('croco',final)
cv2.waitKey(0)

