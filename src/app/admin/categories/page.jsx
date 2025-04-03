"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { input } from "@/components/ui/input";
// import { button } from "@/components/ui/button";
import { toast } from "sonner";
import "./styles.css";

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    categoryTypes: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Category Saved!");
    setOpen(false);
  };

  return (
    <>
      <section>
        <div className="top-bar">
          <h1>Categories</h1>
          <p>Categories will be sorted alphabetically in the product designer</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button onClick={() => setOpen(true)}>Add new category</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Fill in the details below.</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="code" placeholder="Code" value={formData.code} onChange={handleChange} />
                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <input type="text" name="categoryTypes" placeholder="Category Types" value={formData.categoryTypes} onChange={handleChange} />

                <div className="flex justify-end gap-2">
                  <button variant="outline" onClick={() => setOpen(false)}>Cancel</button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
}
