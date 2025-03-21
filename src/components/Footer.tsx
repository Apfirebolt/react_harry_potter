import React, { Fragment, FC } from "react";

const FooterComponent: FC = () => {
  return (
    <Fragment>
      <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white lg:text-left">
        <div className="container p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="mb-6 md:mb-0">
              <h5 className="mb-2 font-medium uppercase">About the App</h5>

              <p className="mb-4">
                Welcome to the Harry Potter app! Dive into the magical world of
                Hogwarts, explore characters, spells, and much more. Stay tuned
                for updates and new features.
              </p>
            </div>

            <div className="mb-6 md:mb-0">
              <h5 className="mb-2 font-medium uppercase">Contact Us</h5>

              <p className="mb-4">
                Have questions or feedback? Reach out to us at
                <a href="mailto:support@harrypotterapp.com">
                  {" "}
                  support@harrypotterapp.com
                </a>
                . We'd love to hear from you!
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-black/5 p-4 text-center">
          © 2023 Copyright:
          <a href="https://harrypotterapp.com/">Harry Potter App</a>
        </div>
      </footer>
    </Fragment>
  );
};

export default FooterComponent;
