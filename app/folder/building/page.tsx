const Page = () => {
    return (
      <div className="screen">
          <h1>Therapy Location</h1>
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.33488338837!2d30.910702475142777!3d-29.969804427818428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef7acb92bb39671%3A0x5fff50d20ffe53f0!2sMangosuthu%20University%20of%20Technology!5e0!3m2!1sen!2sza!4v1721452952269!5m2!1sen!2sza"
              width="600"
              height="450"
              style={{ border: '0' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </div>
    );
  }
  
  export default Page;
  