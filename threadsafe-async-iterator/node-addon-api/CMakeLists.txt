if(CMAKE_JS_VERSION)
project (example)
include_directories(${CMAKE_JS_INC} node_modules/node-addon-api/)
cmake_minimum_required(VERSION 3.18)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
include_directories(${CMAKE_JS_INC})
file(GLOB SOURCE_FILES "*.cc")
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

# Include Node-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})

# define NAPI_VERSION
add_definitions(-DNAPI_VERSION=6)
else()
cmake_minimum_required(VERSION 3.9)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "archive output")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "library output")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "exedll output")
set(CMAKE_PDB_OUTPUT_DIRECTORY     "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "pdb output")


set(CMAKE_CXX_STANDARD 17)

project(example)

add_compile_options("-sDISABLE_EXCEPTION_CATCHING=0" "-sUSE_PTHREADS=1")

add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/@tybys/emnapi" "${CMAKE_CURRENT_SOURCE_DIR}/build/emnapi")

add_executable(example example.cc)

target_link_libraries(example emnapi_noruntime)
target_link_options(example PRIVATE
  "-sEXPORTED_FUNCTIONS=['_malloc','_free']"
  "-sALLOW_MEMORY_GROWTH=1"
  "-sNODEJS_CATCH_EXIT=0"
  "-sDISABLE_EXCEPTION_CATCHING=0"
  "-sUSE_PTHREADS=1"
  "-sPTHREAD_POOL_SIZE=4"
)
endif()
