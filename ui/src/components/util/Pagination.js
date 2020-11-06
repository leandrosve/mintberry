import React from "react";
import PropTypes from "prop-types";
import { Pagination as BulmaPagination } from "bloomer/lib/components/Pagination/Pagination";
import { PageList } from "bloomer/lib/components/Pagination/PageList";
import { PageLink } from "bloomer/lib/components/Pagination/PageLink";
import { Page } from "bloomer/lib/components/Pagination/Page";

const Pagination = ({ pageCount, currentPage, handleClick }) => {
  if (pageCount < 2) return <></>;
  let pageList = [...Array(pageCount).keys()];
  return (
    <BulmaPagination>
      <PageList className="is-justify-content-center">
        <PageLink
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) handleClick(currentPage - 1);
          }}
        >
          ←
        </PageLink>

        {pageList.map((i) => {
          const page = i + 1;

          return (
            <Page>
              <PageLink
                onClick={() => handleClick(page)}
                isCurrent={currentPage === page}
              >
                {page}
              </PageLink>
            </Page>
          );
        })}

        <PageLink
          disabled={currentPage === pageCount}
          onClick={() => {
            if (currentPage !== pageCount) handleClick(currentPage + 1);
          }}
        >
          →
        </PageLink>
      </PageList>
    </BulmaPagination>
  );
};

Pagination.propTypes = {};

export default Pagination;
