import cv2

import numpy as np

img = cv2.imread("C:/Users/Cyber/Downloads/OPENCV/Task/rose1.png")
h=int(img.shape[0] * 0.7)
w=int(img.shape[1] * 0.7)
img_res=cv2.resize(img,(w,h),interpolation=cv2.INTER_AREA)
gray=cv2.cvtColor(img_res,cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(img_res, cv2.COLOR_BGR2HSV)
blur_gray=cv2.GaussianBlur(gray, (11, 11), 0)

lower_red = np.array([100,90, 0])
upper_red = np.array([255, 255, 255])
mask = cv2.inRange(hsv, lower_red, upper_red)
result = cv2.bitwise_and(img_res, img_res, mask=mask)
final_blur = cv2.cvtColor(blur_gray, cv2.COLOR_GRAY2BGR)

r=cv2.add(result,final_blur)
cv2.imshow('origin', r)
cv2.waitKey(0)

