"use client";

import { useState } from "react";

export default function EditWatch({ watch }) {
  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({
    brand: watch.brand,
    model: watch.model,
    referenceNumber: watch.referenceNumber,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <button onClick={() => setShowModel(true)}>Edit</button>
      {showModel && (
        <div>
          <div>
            <span onClick={() => setShowModel(false)}>&times;</span>
            <form action="updateWatch" onSubmit={() => setShowModel(false)}>
              <input type="hidden" name="id" id={watch.id} />

              <div></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
