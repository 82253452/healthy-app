FROM node:alpine as builder
ENV PROJECT_ENV production
# http-server 不变动也可以利用缓存
WORKDIR /code
ADD package.json /code
RUN npm install --no-cache
ADD . /code
# npm run uploadCdn 是把静态资源上传至 cdn 上的脚本文件
#  && npm run uploadCdn
RUN npm run build
# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/dist/index.html code/dist/umi.js code/dist/umi.css /usr/share/nginx/html/
COPY --from=builder code/dist/static /usr/share/nginx/html/static
