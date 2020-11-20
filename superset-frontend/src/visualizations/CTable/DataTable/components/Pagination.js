/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
// first, ..., prev, current, next, ..., last
const MINIMAL_PAGE_ITEM_COUNT = 7;
/**
 * Generate numeric page items around current page.
 *   - Always include first and last page
 *   - Add ellipsis if needed
 */

export function generatePageItems(total, current, width) {
  if (width < MINIMAL_PAGE_ITEM_COUNT) {
    throw new Error(`Must allow at least ${MINIMAL_PAGE_ITEM_COUNT} page items`);
  }

  if (width % 2 === 0) {
    throw new Error(`Must allow odd number of page items`);
  }

  if (total < width) {
    return [...new Array(total).keys()];
  }

  const left = Math.max(0, Math.min(total - width, current - Math.floor(width / 2)));
  const items = new Array(width);

  for (let i = 0; i < width; i += 1) {
    items[i] = i + left;
  } // replace non-ending items with placeholders


  if (items[0] > 0) {
    items[0] = 0;
    items[1] = 'prev-more';
  }

  if (items[items.length - 1] < total - 1) {
    items[items.length - 1] = total - 1;
    items[items.length - 2] = 'next-more';
  }

  return items;
}
export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function Pagination({
  style,
  pageCount,
  currentPage = 0,
  maxPageItemCount = 9,
  onPageChange
}, ref) {
  const pageItems = generatePageItems(pageCount, currentPage, maxPageItemCount);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "dt-pagination",
    style: style
  }, /*#__PURE__*/React.createElement("ul", {
    className: "pagination pagination-sm"
  }, pageItems.map((item, i) => typeof item === 'number' ?
  /*#__PURE__*/
  // actual page number
  React.createElement("li", {
    key: item,
    className: currentPage === item ? 'active' : undefined
  }, /*#__PURE__*/React.createElement("a", {
    href: `#page-${item}`,
    role: "button",
    onClick: e => {
      e.preventDefault();
      onPageChange(item);
    }
  }, item + 1)) : /*#__PURE__*/React.createElement("li", {
    key: item,
    className: "dt-pagination-ellipsis"
  }, /*#__PURE__*/React.createElement("span", null, "\u2026")))));
}));