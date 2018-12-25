#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.jimyang.reactnative02/host.exp.exponent.MainActivity
