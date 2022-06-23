cmake_minimum_required(VERSION 3.9)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "archive output")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "library output")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "exedll output")
set(CMAKE_PDB_OUTPUT_DIRECTORY     "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "pdb output")

project(napi-asyncworker-example-native)

add_compile_options("-sDISABLE_EXCEPTION_CATCHING=0" "-sUSE_PTHREADS=1")

add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/@tybys/emnapi" "${CMAKE_CURRENT_SOURCE_DIR}/build/emnapi")

add_executable(napi-asyncworker-example-native src/RunSimpleAsyncWorker.cc src/SimpleAsyncWorker.cc)

target_link_libraries(napi-asyncworker-example-native emnapi_noruntime)
target_link_options(napi-asyncworker-example-native PRIVATE
  "-sEXPORTED_FUNCTIONS=['_malloc','_free']"
  "-sALLOW_MEMORY_GROWTH=1"
  "-sNODEJS_CATCH_EXIT=0"
  "-sDISABLE_EXCEPTION_CATCHING=0"
  "-sUSE_PTHREADS=1"
  "-sPTHREAD_POOL_SIZE=4"
)
