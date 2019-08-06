#!/bin/bash
# ng build --aot --prod
rm -rf build/app.tar.gz
cd dist
tar -zcvf app.tar.gz ./bookmanagement-angular/
mv app.tar.gz ../build
cd ../build
docker build . -t hikaruright/bookmanagement-angular:1.0.10
docker push hikaruright/bookmanagement-angular:1.0.10