import React, { Fragment, FC } from "react";

const FooterComponent: FC = () => {
  return (
    <Fragment>
      <footer
        className="bg-primary-100
             text-xl text-secondary-100 text-center
             border-t-4
             fixed
             inset-x-0
             bottom-0
             p-4"
      >
        <div className="grid grid-cols-3 gap-4 border-b-2 border-neutral-600">
          <div>
            <h3 className="text-center text-lg font-bold my-2">Houses</h3>
            <p>All the houses in Hogwarts</p>
          </div>
          <div>
            <h3 className="text-center text-lg font-bold my-2">Spells</h3>
            <p>All the spells in the wizarding world</p>
          </div>
          <div>
            <h3 className="text-center text-lg font-bold my-2">Characters</h3>
            <p>Get to know your favorite characters</p>
          </div>
        </div>
        <div className="mt-4">
          <p>Copyright @2025 Harry Potter Fan Club</p>
        </div>
      </footer>
    </Fragment>
  );
};

export default FooterComponent;
