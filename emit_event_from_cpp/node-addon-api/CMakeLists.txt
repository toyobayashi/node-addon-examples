cmake_minimum_required(VERSION 3.9)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "archive output")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "library output")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "exedll output")
set(CMAKE_PDB_OUTPUT_DIRECTORY     "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "pdb output")

project(emit_from_cpp)

add_compile_options("-sDISABLE_EXCEPTION_CATCHING=0")
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/emnapi" "${CMAKE_CURRENT_SOURCE_DIR}/build/emnapi")

add_executable(emit_from_cpp src/emit-from-cpp.cc)

target_link_libraries(emit_from_cpp emnapi)
target_link_options(emit_from_cpp PRIVATE
  "-sEXPORTED_FUNCTIONS=['_malloc','_free']"
  "-sALLOW_MEMORY_GROWTH=1"
  "-sDISABLE_EXCEPTION_CATCHING=0"
  "-sNODEJS_CATCH_EXIT=0"
)
